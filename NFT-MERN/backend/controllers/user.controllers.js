const asyncHandler = require('express-async-handler');

//@description     Show the account page
//@route           GET /users/account
//@access          Public
const showAccountPage = (req, res) => {
  res.status(200).send("show account page route stub");
}

//@description     Show the login page
//@route           GET /users/login
//@access          Public
const showLoginPage = (req, res) => {
  res.status(200).send("show login page route stub");
};

//@description     Show the register page
//@route           GET /users/register
//@access          Public
const showRegisterPage = (req, res) => {
  res.status(200).send("show register page route stub");
};

//@description     Update account details
//@route           POST /users/account/editDetails
//@access          Public
const performAccountUpdate = asyncHandler(async (req, res) => {
  res.status(200).send("User update details route stub");
});

//@description     Delete an account
//@route           POST /account/delete
//@access          Public
const performAccountDelete = asyncHandler((req, res) => {
  res.status(200).send("User delete account route stub");
});

//@description     Log out the user
//@route           POST /users/logout
//@access          Public
const performLogout = (req, res) => {
  res.status(200).send("User logout route stub");
};

//@description     Switch user between "Member" and "Beneficiary"
//@route           POST /users/account/switchUserType
//@access          Public
const performUserSwitchType = asyncHandler(async (req, res) => {
  res.status(200).send("User type switch route stub");
});

//@description     Auth the user
//@route           POST /users/login
//@access          Public
const performUserAuthentication = asyncHandler(async (req, res) => {
  res.status(200).send("User authentication route stub");
});

//@description     Register new user
//@route           POST /users/register
//@access          Public
const performUserRegistration = asyncHandler(async (req, res) => {
  res.status(200).send("User registration route stub");
});

//@description     Distribute vouchers to all users
//@route           POST /users/distributeVouchers
//@access          Public
const performDistributeVouchers = asyncHandler(async (req, res) => {
  res.status(200).send("User distribute vouchers route stub");
})


module.exports = {
  showAccountPage,
  showLoginPage,
  showRegisterPage,
  performAccountUpdate,
  performAccountDelete,
  performLogout,
  performUserSwitchType,
  performUserAuthentication,
  performUserRegistration,
  performDistributeVouchers,
};
