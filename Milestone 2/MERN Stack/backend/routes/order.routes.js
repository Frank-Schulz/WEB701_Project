const express = require('express');
const {
  getOrders,
  getFilteredOrders,
  getOneOrder,
  postCreateOrder,
  patchCompleteOrder,
  postDeleteOrder,
} = require('../controllers/order.controllers');
const router = express.Router();


// GET route ==> to get order(s)
router.get("/", getOrders);

// POST route ==> to get order(s)
router.post("/filter", getFilteredOrders);

// GET route ==> to get one order
router.get('/:parameter', getOneOrder);

// POST route ==> Add a new order to the database
router.post('/create_order', postCreateOrder);

// POST route ==> Update the details of the order
router.patch('/complete/:parameter', patchCompleteOrder);

// POST route ==> Delete a order
router.delete('/delete/:parameter', postDeleteOrder);


module.exports = router;
