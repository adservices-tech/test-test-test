import express from 'express';
import { 
    listProducts, 
    addProduct, 
    removeProduct, 
    singleProduct,
    toggleListingStatus,
    updateProductPrice
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Add product (admin only)
productRouter.post('/add',
    adminAuth,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ]),
    addProduct
);

// Remove product (admin only)
productRouter.post('/remove', adminAuth, removeProduct);

// Toggle listing status (admin only)
productRouter.post('/toggle-status', adminAuth, toggleListingStatus);

// Update product price (admin only)
productRouter.post('/update-price', adminAuth, updateProductPrice);

// Get single product info
productRouter.post('/single', singleProduct);

// List products with search, pagination, and filtering
productRouter.get('/list', listProducts);

export default productRouter;