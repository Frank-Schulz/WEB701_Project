const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: 'string',
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: 'string',
            trim: true,
            required: true
        },
        type: {
            type: 'string',
            required: true,
            default: "beneficiary",
        },
        fullName: {
            type: 'string',
            trim: true,
            required: true
        },
        DoB: {
            type: Date,
            required: true,
        },
        registrationDate: {
            type: Date,
            required: true,
            default: new Date().getDate(),
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
