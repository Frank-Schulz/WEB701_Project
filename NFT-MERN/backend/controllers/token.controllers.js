const asyncHandler = require('express-async-handler');

//@description     Show a token
//@route           GET /:id
//@access          Public
const showToken = (req, res) => {
  res.status(200).send("show a token route stub");
}

//@description     Add a token
//@route           POST /add
//@access          Public
const performTokenAdd = asyncHandler(async (req, res) => {
  res.status(200).send("add token route stub");
})

//@description     Delete a token
//@route           POST /delete/:id
//@access          Public
const performTokenDelete = asyncHandler(async (req, res) => {
  res.status(200).send("delete token page route stub");
})

//@description     Validate a token
//@route           POST /:id
//@access          Public
const performTokenValidation = asyncHandler(async (req, res) => {
  res.status(200).send("validate token route stub");
})


module.exports = {
  showToken,
  performTokenAdd,
  performTokenDelete,
  performTokenValidation,
};
