const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: 'string',
            trim: true,
            required: true,
            unique: true,
        },
        fullName: {
            type: 'string',
            trim: true,
            required: true
        },
        password: {
            type: 'string',
            trim: true,
            required: true
        },
        type: {
            type: 'string',
            required: true,
            default: 'beneficiary'
        },
        vouchers: {
            type: 'number',
            default: 1
        }
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model('User', userSchema);
module.exports = Users;
