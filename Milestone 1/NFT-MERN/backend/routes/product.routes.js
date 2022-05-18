const express = require('express');
const {
  showProduct,
  performProductAdd,
  performProductEdit,
  performProductDelete, } = require('../controllers/product.controllers');

const router = express.Router();

/* ------------------------------- GET ROUTES ------------------------------- */

// GET route ==> to display a product.
router.get("/:id", showProduct);

/* ------------------------------- POST ROUTES ------------------------------ */

// POST route ==> to add a product.
router.post("/add", performProductAdd);

// POST route ==> to edit a product.
router.post("/edit/:id", performProductEdit);

// POST route ==> to delete a product.
router.post("/delete/:id", performProductDelete);

module.exports = router;
