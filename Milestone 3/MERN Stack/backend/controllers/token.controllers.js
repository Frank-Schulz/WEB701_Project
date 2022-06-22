const asyncHandler = require('express-async-handler');
const Tokens = require('../models/tokens.model');
const Users = require('../models/users.model');
const { newID } = require("../utils/generateID");

//@description     Display the token browsing page
//@route           GET /tokens/
//@access          Public
const getTokens = asyncHandler(async (req, res, next) => {
  Tokens.find({})
    .then((tokens) => { res.send(tokens) })
});

//@description     get tokens belonging to a user
//@route           GET /tokens/user/:parameter
//@access          Public
const getUserTokens = asyncHandler(async (req, res, next) => {
  const userID = req.params.parameter;

  Tokens.find({ userID: userID })
    .then((tokens) => { res.send(tokens) })
    .catch((error) => { next(error) })
});

//@description     get token from orderID
//@route           GET /tokens/order/:parameter
//@access          Public
const getOrderToken = asyncHandler(async (req, res, next) => {
  const orderID = req.params.parameter;

  Tokens.findOne({ orderID: orderID })
    .then((token) => {
      if (!token) { res.send(false) };
      Users.findOne({ email: token.userID })
        .then((user) => {
          res.send(user.fullName);
        })
        .catch((error) => { next(error) })
    })
    .catch((error) => { next(error) })
});

//@description     Add new token to the database
//@route           POST /tokens/create_token
//@access          Admin
const postCreateToken = asyncHandler(async (req, res, next) => {
  const { userID, orderID } = req.body;

  Tokens.create({
    _id: newID(),
    userID,
    orderID
  })
    .then((token) => { res.send(token); })
    .catch((error) => { next(error); })
});

//@description     Deletes a token
//@route           POST /tokens/delete/:parameter
//@access          Admin
const postDeleteToken = asyncHandler(async (req, res, next) => {
  const orderID = req.params.parameter;

  Tokens.findOneAndDelete({ orderID })
    .then((token) => { res.send(token); })
    .catch((error) => { next(error); })
});


module.exports = {
  getTokens,
  getUserTokens,
  getOrderToken,
  postCreateToken,
  postDeleteToken,
};
