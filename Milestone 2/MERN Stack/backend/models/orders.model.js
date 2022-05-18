const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: 'string',
      required: true,
      unique: true
    },
    productID: {
      type: 'string',
      required: true
    },
    completed: {
      type: 'number',
      required: true,
      default: 0
    },
  },
  {
    timestamps: true,
  });

const Orders = mongoose.model("orders", orderSchema);
module.exports = Orders;
