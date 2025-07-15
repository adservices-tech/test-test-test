import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              itemId,
              size,
              quantity: cartItems[itemId][size]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Your cart is empty</p>
          <button 
            onClick={() => navigate('/collection')}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div>
            {cartData.map((item, index) => {
              const product = products.find(p => p._id === item.itemId);
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={product.image[0]} alt={product.name} />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{product.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{product.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input 
                    onChange={(e) => updateQuantity(item.itemId, item.size, Number(e.target.value))}
                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                    type="number" 
                    min={1} 
                    value={item.quantity}
                  />
                  <img 
                    onClick={() => updateQuantity(item.itemId, item.size, 0)} 
                    className='w-4 mr-4 sm:w-5 cursor-pointer' 
                    src={assets.bin_icon} 
                    alt="Remove" 
                  />
                </div>
              );
            })}
          </div>

          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal />
              <div className='w-full text-end'>
                <button 
                  onClick={() => {
                    if (cartData.length > 0) {
                      navigate('/place-order');
                    } else {
                      toast.error('Your cart is empty!');
                    }
                  }} 
                  className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800'
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;