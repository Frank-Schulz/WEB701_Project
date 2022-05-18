const express = require('express');
const {
  showOrder,
  performOrderAdd,
  performOrderEdit,
  performOrderDelete,
  performOrderClaim, } = require('../controllers/order.controllers');

const router = express.Router();

/* ------------------------------- GET ROUTES ------------------------------- */

// GET route ==> to display an order.
router.get("/:id", showOrder);

/* ------------------------------- POST ROUTES ------------------------------ */

// POST route ==> to add an order.
router.post("/add", performOrderAdd);

// POST route ==> to edit an order.
router.post("/edit/:id", performOrderEdit);

// POST route ==> to delete an order.
router.post("/delete/:id", performOrderDelete);

// POST route ==> to claim an order.
router.post("/claim/:id", performOrderClaim);

module.exports = router;
