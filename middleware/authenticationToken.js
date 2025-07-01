const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).json({ success: false, message: 'Access denied'});

        try {
            const decoded = jwt.verify(tpkem, process.env.JWT_SECRET);
            req.USER = decoded;
            next();
        } catch (error) {
            res.status(403).json({ succcess: false, message: 'Invalid token' });
        }

};


const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token missing or malformed',
      });
    }

    const token = authHeader.split(' ')[1]; // ✅ Define token here

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userID});

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user; // 👈 attaches full user object (with role) to request
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(403).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

module.exports = authenticateToken;