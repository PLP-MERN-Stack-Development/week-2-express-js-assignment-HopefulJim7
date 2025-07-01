const User = require('../models/user');
const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/sendResponse');
const asyncWrapper = require('../utils/asyncWrapper');
const bcrypt = require('bcrypt');

const createToken = (userID) => {
    return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        const token = createToken(user.id);

        sendResponse(res, 201, true, 'User registered succesfully', {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return sendResponse(res, 401, false, 'Invalid Credentials')
        }
        const token = createToken(user.id);
        sendResponse( res, 200, true, 'Login successful', { user, token });
    } catch (error) {
       next(error); 
    }
};

 exports.getUser = asyncWrapper(async (req, res) => {
     const user = await User.findById(req.params.id);
     res.status(200).json({ success: true, user });
 });