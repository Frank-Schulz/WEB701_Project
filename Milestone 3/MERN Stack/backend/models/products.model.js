const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        id: {
            type: 'string',
            required: true,
            unique: true
        },
        name: {
            type: 'string',
            required: true
        },
        vouchers: {
            type: 'number',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        imagePath: {
            type: 'string',
            required: true,
            default: '../public/imgs/productDefault.png'
        },
        stock: {
            type: 'number',
            required: true,
            default: 1
        },
    },
    {
        timestamps: true,
    }
);

const Products = mongoose.model("products", productSchema);
module.exports = Products;
