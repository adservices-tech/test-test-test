import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !subCategory || !sizes) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Handle image uploads
        const images = [];
        for (let i = 1; i <= 4; i++) {
            if (req.files[`image${i}`] && req.files[`image${i}`][0]) {
                images.push(req.files[`image${i}`][0]);
            }
        }

        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required"
            });
        }

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image',
                    folder: 'products'
                });
                return result.secure_url;
            })
        );

        // Create product data
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            isListed: true // Default to listed
        };

        const product = new productModel(productData);
        await product.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product
        });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to add product"
        });
    }
};

// List all products with filters
const listProducts = async (req, res) => {
    try {
        const { search, page = 1, limit = 10, status } = req.query;
        const skip = (page - 1) * limit;

        // Build query
        const query = {};
        
        // Search functionality
        if (search) {
            query.$text = { $search: search };
        }

        // Status filter
        if (status === 'listed') {
            query.isListed = true;
        } else if (status === 'delisted') {
            query.isListed = false;
        }

        const [products, total] = await Promise.all([
            productModel.find(query)
                .skip(skip)
                .limit(Number(limit))
                .sort({ createdAt: -1 }),
            productModel.countDocuments(query)
        ]);

        res.json({
            success: true,
            products,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)
        });

    } catch (error) {
        console.error("Error listing products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
};

// Remove product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Optionally: Delete images from Cloudinary
        // await Promise.all(product.image.map(url => cloudinary.uploader.destroy(url)));

        res.json({
            success: true,
            message: "Product removed successfully"
        });

    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove product"
        });
    }
};

// Get single product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product"
        });
    }
};

// Toggle product listing status
const toggleListingStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (!id || typeof status !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: "Invalid request data"
            });
        }

        const product = await productModel.findByIdAndUpdate(
            id,
            { isListed: status },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: `Product ${status ? 'listed' : 'delisted'} successfully`,
            product
        });

    } catch (error) {
        console.error("Error toggling product status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update product status"
        });
    }
};

// Update product price
const updateProductPrice = async (req, res) => {
    try {
        const { id, price } = req.body;

        if (!id || isNaN(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid price value"
            });
        }

        const product = await productModel.findByIdAndUpdate(
            id,
            { price: Number(price) },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Price updated successfully",
            product
        });

    } catch (error) {
        console.error("Error updating product price:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update price"
        });
    }
};

export { 
    listProducts, 
    addProduct, 
    removeProduct, 
    singleProduct,
    toggleListingStatus,
    updateProductPrice
};