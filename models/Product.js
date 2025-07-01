const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const productSchema = new mongoose.Schema ({
    _id: { type: String, default: uuidv4,  required: true},
    name: { type: String, required: true, trim: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema)  