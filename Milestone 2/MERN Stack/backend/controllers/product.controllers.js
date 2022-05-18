const asyncHandler = require('express-async-handler');
const Products = require('../models/products.model');
const { newID } = require("../utils/generateID");

//@description     Display the product browsing page
//@route           GET /products/
//@access          Public
const showBrowseProductsPage = asyncHandler(async (req, res) => {
  Products.find({})
    .then((products) => { res.send(products) })
    .catch((error) => { next(error); });
});

//@description     Display the product page
//@route           GET /products/:parameter
//@access          Public
const showProductPage = asyncHandler(async (req, res) => {
  const productId = req.params.parameter;

  Products.findOne({ id: productId })
    .then((product) => { res.send(product) })
    .catch((error) => { next(error); });
});

//@description     Add new product to the database
//@route           POST /products/add_product
//@access          Admin
const performProductAdd = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    imagePath,
    stock,
  } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("Name is required!")
  } if (!price) {
    res.status(401);
    throw new Error("Price is required!")
  } if (!description) {
    res.status(401);
    throw new Error("Description is required!")
  } if (!imagePath) {
    res.status(401);
    throw new Error("Image path is required!")
  }

  Products.create({
    id: newID(),
    name,
    price,
    description,
    imagePath,
    stock,
    live,
    unlimited,
  })
    .then((product) => {
      res.send(product);
    })
    .catch((error) => { next(error); });
});

//@description     Update a products details
//@route           POST /products/update/:parameter
//@access          Admin
const performProductUpdate = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    imagePath,
    stock,
  } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("Name is required!")
  } if (!price) {
    res.status(401);
    throw new Error("Price is required!")
  } if (!description) {
    res.status(401);
    throw new Error("Description is required!")
  } if (!imagePath) { // TODO: check imagePath requirement
    // res.status(401);
    // throw new Error("Image path is required!")
  }

  Products.findOneAndUpdate(
    { id: req.params.parameter },
    {
      $set: {
        name: name,
        price: price,
        description: description,
        imagePath: imagePath,
        stock: stock,
      }
    })
    .then((product) => {
      res.send(product);
    })
    .catch((error) => { next(error); });
});

//@description     Deletes a product
//@route           POST /products/delete/:parameter
//@access          Admin
const performProductDelete = asyncHandler(async (req, res) => {
  const productId = req.params.parameter;

  Products.findOneAndDelete({ id: productId })
    .then((product) => {
      res.send(product);
    })
    .catch((error) => { next(error); });

});


module.exports = {
  showBrowseProductsPage,
  showProductPage,
  performProductAdd,
  performProductUpdate,
  performProductDelete
};
