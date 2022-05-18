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
        registrationDate: {
            type: Date,
            required: true,
            default: new Date().getDate(),
        },
        vouchers: {
            type: 'number',
            default: 2,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (incomingPassword) {
    return await bcrypt.compare(incomingPassword, this.password)
}

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
