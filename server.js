// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./Errors/errorHandler');
const connectDB = require('./config/db');


// Initialize Express app
const app = express();
// const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors ({ origin: 'http://localhost:3000', credentials: true}));
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev'));

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

//Routes 
app.use('/api/auth', authRoutes);

// Error Handling Middleware 
app.use(errorHandler);

// Database +Server Initaialization
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Serveris running on port ${PORT}`));
}); 


// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// Export the app for testing purposes
module.exports = app; 