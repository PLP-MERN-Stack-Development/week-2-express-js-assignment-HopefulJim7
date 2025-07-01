const express = require('express');
const router = express.Router();
const validateProductInput = require('../middleware/validateProductInput');
const authorizeRole = require('../middleware/authorizeRole');
const authenticateToken = require('../middleware/authenticationToken');

const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

router.post('/', authenticateToken, authorizeRole('Admin'), validateProductInput, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id',authenticateToken, authorizeRole('Supervisor'), validateProductInput, updateProduct);
router.delete('/:id', authenticateToken, authorizeRole('Admin'), validateProductInput, deleteProduct);

module.exports = router; 