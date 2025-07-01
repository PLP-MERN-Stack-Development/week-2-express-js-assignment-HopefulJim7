const sendResponse = require('../utils/sendResponse');

module.exports = (err, req, res, next) => {
    const statusCode = res.statusCode !==200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'something went wrong' ,
        stack: process.env.NODE_ENV ==='development' ? err.stack: undefined,
    })
}