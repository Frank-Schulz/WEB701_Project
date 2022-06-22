const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userID: {
      type: 'string',
      required: true
    },
    orderID: {
      type: 'string',
      required: true,
      unique: true
    },
  });

const Tokens = mongoose.model("tokens", orderSchema);
module.exports = Tokens;
