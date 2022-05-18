const asyncHandler = require('express-async-handler');

//@description     Show an product
//@route           GET /:id
//@access          Public
const showProduct = asyncHandler(async (req, res) => {
  res.status(200).send("show a product route stub");
})

//@description     Add an product
//@route           POST /add
//@access          Public
const performProductAdd = asyncHandler(async (req, res) => {
  res.status(200).send("add an product route stub");
})

//@description     Edit an product
//@route           POST /edit/:id
//@access          Public
const performProductEdit = asyncHandler(async (req, res) => {
  res.status(200).send("edit an product route stub");
})

//@description     Delete an product
//@route           POST /delete/:id
//@access          Public
const performProductDelete = asyncHandler(async (req, res) => {
  res.status(200).send("delete an product route stub");
})


module.exports = {
  showProduct,
  performProductAdd,
  performProductEdit,
  performProductDelete,
};
