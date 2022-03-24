const asyncHandler = require('express-async-handler');

//@description     Show an order
//@route           GET /:id
//@access          Public
const showOrder = (req, res) => {
  res.status(200).send("show a order route stub");
}

//@description     Add an order
//@route           POST /add
//@access          Public
const performOrderAdd = asyncHandler(async (req, res) => {
  res.status(200).send("add an order route stub");
})

//@description     Edit an order
//@route           POST /edit/:id
//@access          Public
const performOrderEdit = asyncHandler(async (req, res) => {
  res.status(200).send("edit an order route stub");
})

//@description     Delete an order
//@route           POST /delete/:id
//@access          Public
const performOrderDelete = asyncHandler(async (req, res) => {
  res.status(200).send("delete an order route stub");
})

//@description     Claim an order
//@route           POST /claim/:id
//@access          Public
const performOrderClaim = asyncHandler(async (req, res) => {
  res.status(200).send("claim an order route stub");
})


module.exports = {
  showOrder,
  performOrderAdd,
  performOrderEdit,
  performOrderDelete,
  performOrderClaim,
};
