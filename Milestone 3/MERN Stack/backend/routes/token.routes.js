const express = require('express');
const {
  getTokens,
  getUserTokens,
  getOrderToken,
  postCreateToken,
  postDeleteToken,
} = require('../controllers/token.controllers');
const router = express.Router();


// GET route ==> to get token(s)
router.get("/", getTokens);

// GET route ==> to get one token
router.get('/user/:parameter', getUserTokens);

// GET route ==> to get one token
router.get('/order/:parameter', getOrderToken);

// POST route ==> Add a new token to the database
router.post('/create_token', postCreateToken);

// POST route ==> Delete a token
router.delete('/delete/:parameter', postDeleteToken);


module.exports = router;
