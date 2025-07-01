const Product = require('../models/Product');
const asyncWrapper = require('../utils/asyncWrapper');
const sendResponse = require('../utils/sendResponse');
const queryBuilder = require('../utils/queryBuilder');


// TODO: Implement the following routes:
// GET /api/products - Get all products
exports.getAllProducts = asyncWrapper(async (req, res) => {
    const { filter, pagination, sortBy } = queryBuilder(req.query);
    
    const products = await Product.find(filter)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .sort(sortBy);

    const total = await Product.countDocuments(filter);

    sendResponse(res, 200, true, 'Products retrieved successfuly', {
        products, 
        pagination: {
            total,
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10
        }
    });
});

// // GET /api/products/:id - Get a specific product
exports.getProductById = asyncWrapper(async (req, res) => {
    const product = await Product.findOne({ id: req.params.id });
    if(!product) { return sendResponse (res, 404, false, 'Product not found'); }
    sendResponse(res, 200, true, 'Product Found', product);
});

// POST /api/products - Create a new product
exports.createProduct = asyncWrapper(async (req, res) => {
    const product = await Product.create(req.body);
    sendResponse(res, 201, true, 'Product created Successfuly', product);
});

// PUT /api/products/:id - Update a product
exports.updateProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true, runValidators: true }
    );
    if(!product) return sendResponse(res, 404, false, 'Product not found');
    sendResponse(res, 200, true, 'Product updated', product);
});

// DELETE /api/products/:id - Delete a product
exports.deleteProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.params.id});
    if(!product) return sendResponse(res, 404, false, 'Product not found');
    sendResponse(res, 200, true, 'Product deleted');
});