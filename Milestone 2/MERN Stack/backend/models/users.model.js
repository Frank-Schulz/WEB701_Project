const mongoose = require('mongoose');

// TODO: complete userSchema
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
            default: 'beneficiary' // TODO: set this on landing page
        },
        vouchers: {
            type: Number,
            default: 3
        }
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model('User', userSchema);
module.exports = Users;
