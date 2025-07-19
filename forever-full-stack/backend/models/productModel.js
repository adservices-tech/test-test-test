import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true,
        trim: true
    },
    price: { 
        type: Number, 
        required: true,
        min: 0
    },
    image: { 
        type: [String], 
        required: true,
        validate: {
            validator: function(array) {
                return array.length > 0;
            },
            message: "At least one image is required"
        }
    },
    category: { 
        type: String, 
        required: true,
        trim: true
    },
    subCategory: { 
        type: String, 
        required: true,
        trim: true
    },
    sizes: { 
        type: [String], 
        required: true,
        validate: {
            validator: function(array) {
                return array.length > 0;
            },
            message: "At least one size is required"
        }
    },
    bestseller: { 
        type: Boolean,
        default: false
    },
    isListed: {
        type: Boolean,
        default: true,
        index: true // For better query performance
    },
    date: { 
        type: Date,
        default: Date.now
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add text index for search functionality
productSchema.index({
    name: 'text',
    description: 'text',
    category: 'text',
    subCategory: 'text'
});

// Virtual for formatted date
productSchema.virtual('formattedDate').get(function() {
    return this.date.toLocaleDateString();
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;