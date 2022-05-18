const express = require('express');
const {
  getTokens,
  getUserTokens,
  getOrderToken,
  postCreateToken,
  postDeleteToken,
} = require('../controllers/token.controllers');
const router = express.Router();


// GET route ==> to get order(s)
router.get("/", getTokens);

// GET route ==> to get one order
router.get('/user/:parameter', getUserTokens);

// GET route ==> to get one order
router.get('/order/:parameter', getOrderToken);

// POST route ==> Add a new order to the database
router.post('/create_token', postCreateToken);

// POST route ==> Delete a order
router.delete('/delete/:parameter', postDeleteToken);


module.exports = router;
