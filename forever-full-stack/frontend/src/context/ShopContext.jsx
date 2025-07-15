import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // Enhanced addToCart with notifications
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select a product size');
            return;
        }

        const product = products.find(p => p._id === itemId);
        if (!product) {
            toast.error('Product not found');
            return;
        }

        const newCartItems = { ...cartItems };
        
        // Initialize if not exists
        if (!newCartItems[itemId]) {
            newCartItems[itemId] = {};
        }

        // Update quantity
        const currentQty = newCartItems[itemId][size] || 0;
        newCartItems[itemId][size] = currentQty + 1;
        
        setCartItems(newCartItems);

        // Show success notification
        toast.success(
            <div className="flex items-center">
                <img 
                    src={product.image[0]} 
                    alt={product.name} 
                    className="w-10 h-10 object-cover mr-3 rounded"
                />
                <div>
                    <p className="font-medium">Added to cart!</p>
                    <p className="text-sm">{product.name} ({size})</p>
                </div>
            </div>,
            {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            }
        );

        // Sync with backend if authenticated
        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/add`, 
                    { itemId, size }, 
                    { headers: { token } }
                );
            } catch (error) {
                console.error('Cart update failed:', error);
                toast.error(error.response?.data?.message || 'Failed to update cart');
                // Revert on error
                setCartItems(cartItems);
            }
        }
    };

    // Enhanced updateQuantity with notifications
    const updateQuantity = async (itemId, size, quantity) => {
        const product = products.find(p => p._id === itemId);
        if (!product) {
            toast.error('Product not found');
            return;
        }

        const newCartItems = { ...cartItems };
        const currentQty = newCartItems[itemId]?.[size] || 0;

        // Handle removal
        if (quantity <= 0) {
            // Confirm removal
            toast.warn(
                <div>
                    <p>Remove {product.name} from cart?</p>
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={() => {
                                const updatedCart = { ...newCartItems };
                                delete updatedCart[itemId][size];
                                // Remove empty product entries
                                if (Object.keys(updatedCart[itemId]).length === 0) {
                                    delete updatedCart[itemId];
                                }
                                setCartItems(updatedCart);
                                toast.dismiss();
                                toast.success(`${product.name} removed from cart`);
                                syncCartWithBackend(itemId, size, 0);
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                        >
                            Remove
                        </button>
                        <button
                            onClick={() => toast.dismiss()}
                            className="px-3 py-1 bg-gray-200 rounded text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>,
                {
                    position: "bottom-right",
                    autoClose: false,
                    closeOnClick: false,
                }
            );
            return;
        }

        // Update quantity
        if (!newCartItems[itemId]) {
            newCartItems[itemId] = {};
        }
        newCartItems[itemId][size] = quantity;
        setCartItems(newCartItems);

        // Show quantity change notification
        if (quantity > currentQty) {
            toast.success(`Added ${quantity - currentQty} more ${product.name}`);
        } else {
            toast.info(`Updated quantity for ${product.name}`);
        }

        // Sync with backend
        syncCartWithBackend(itemId, size, quantity);
    };

    // Helper function for backend sync
    const syncCartWithBackend = async (itemId, size, quantity) => {
        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.error('Cart sync failed:', error);
                toast.error(error.response?.data?.message || 'Failed to update cart');
                // Revert on error
                setCartItems(cartItems);
            }
        }
    };

    // Optimized cart count calculation
    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, sizes) => {
            return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
        }, 0);
    };

    // Optimized cart amount calculation
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const product = products.find(p => p._id === itemId);
            if (!product) return total;
            
            return total + Object.entries(sizes).reduce((sum, [_, qty]) => {
                return sum + (product.price * qty);
            }, 0);
        }, 0);
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Failed to load products:', error);
            toast.error(error.response?.data?.message || 'Failed to load products');
        }
    };

    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`,
                {},
                { headers: { token: userToken } }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.error('Failed to load cart:', error);
            toast.error(error.response?.data?.message || 'Failed to load cart');
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !token) {
            setToken(storedToken);
            getUserCart(storedToken);
        } else if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;