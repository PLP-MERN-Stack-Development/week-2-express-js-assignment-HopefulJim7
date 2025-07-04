const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Supervisor'],
        default: 'User'
    }
}, { timestamps: true});

userSchema.pre('save', async function () {
if(!this.isModified('password')) return;
this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
