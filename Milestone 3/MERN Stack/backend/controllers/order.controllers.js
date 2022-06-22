const asyncHandler = require('express-async-handler');
const Orders = require('../models/orders.model');
const { newID } = require("../utils/generateID");

//@description     get all orders
//@route           GET /orders/
//@access          Public
const getOrders = asyncHandler(async (req, res, next) => {
  Orders.find({})
    .then((orders) => {
      console.log(orders);
      res.send({ orders })
    })
    .catch((error) => { next(error) })
});

//@description     Display the order browsing page
//@route           POST /orders/filtered/:parameter
//@access          Public
const getFilteredOrders = asyncHandler(async (req, res, next) => {
  let tokens = [];
  req.body.forEach(token => {
    tokens.push(token.orderID)
  });

  Orders.find({
    orderID: { $in: tokens }
  })
    .then((orders) => {
      res.send({ orders })
    })
    .catch((error) => { next(error) })
});

//@description     Display the order page
//@route           GET /orders/:parameter
//@access          Public
const getOneOrder = asyncHandler(async (req, res, next) => {
  const orderID = req.params.parameter;

  Orders.findOne({ orderID })
    .then((order) => { res.send(order) })
    .catch((error) => { next(error) })
});

//@description     Add new order to the database
//@route           POST /orders/create_order
//@access          Admin
const postCreateOrder = asyncHandler(async (req, res, next) => {
  const {
    orderID,
    productID
  } = req.body;

  Orders.create({
    id: orderID,
    productID
  }).then((order) => {
    res.send(order);
  }).catch((error) => { next(error); });
});

//@description     Update a orders details
//@route           PATCH /orders/complete/:parameter
//@access          Admin
const patchCompleteOrder = asyncHandler(async (req, res, next) => {
  Orders.findOneAndUpdate(
    { id: req.params.parameter },
    {
      $set: {
        complete: true
      }
    })
    .then((order) => {
      res.send(order);
    })
    .catch((error) => {
      res.status(401);
      throw new Error(error.message);
    });
});

//@description     Deletes a order
//@route           POST /orders/delete/:parameter
//@access          Admin
const postDeleteOrder = asyncHandler(async (req, res, next) => {
  const orderID = req.params.parameter;

  Orders.findOneAndDelete({ id: orderID })
    .then((order) => {
      res.send(order);
    });
});


module.exports = {
  getOrders,
  getFilteredOrders,
  getOneOrder,
  postCreateOrder,
  patchCompleteOrder,
  postDeleteOrder,
};
