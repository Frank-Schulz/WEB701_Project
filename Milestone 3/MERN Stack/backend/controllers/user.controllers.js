const asyncHandler = require('express-async-handler');
const Users = require('../models/users.model');
const generateToken = require("../utils/generateToken.js");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

//@description     Show the login page
//@route           GET /users/login
//@access          Public
const showLoginPage = (req, res, next) => {
  res.send({
    email: "",
    password: "",
    errorMessage: ""
  });
};

//@description     Show the register page
//@route           GET /users/register
//@access          Public
const showRegisterPage = (req, res, next) => {
  res.send({
    email: "",
    fullName: "",
    password: "",
    errorMessage: ""
  });
};

//@description     Show the account page
//@route           GET /users/account
//@access          Public
const showAccountPage = (req, res, next) => {
  res.send({ user: req.session.user });
}

//@description     Show edit account details page
//@route           GET /users/account
//@access          Public
const showDetailsPage = (req, res, next) => {
  res.send({ user: req.session.user });
};

//@description     Auth the user
//@route           POST /users/login
//@access          Public
const performUserAuthentication = asyncHandler(async (req, res, next) => {
  // Get login form data
  const { email, password } = req.body;
  // Validate that email and password are not empty.
  if (!email || !password) {
    res.status(401);
    throw new Error("All fields are mandatory. Please provide your email and password!");
  }

  Users.findOne({ email })
    .then((user) => {
      // check if found user was an object or null
      // check if entered password is correct
      if (user && bcrypt.compareSync(password, user.password)) {
        // Add user to session and redirect to the user's account page
        req.session.user = user;
        res.redirect("/users/account");
      } else {
        res.status(401);
        throw new Error("Incorrect email or password!");
      }
    })
    .catch((error) => next(error));
});

//@description     Log out the user
//@route           POST /users/logout
//@access          Public
const performLogout = (req, res, next) => {
  req.session.destroy();
  res.send(true);
};

//@description     Register new user
//@route           POST /users/register
//@access          Public
const performUserRegistration = asyncHandler(async (req, res, next) => {
  const {
    email,
    password,
    fullName, } = req.body;

  if (!email || !password || !fullName) {
    res.status(401);
    throw new Error("All fields are required!");
  }

  const emailFormatRegex = /^\S+@\S+\.\S+$/;

  if (!emailFormatRegex.test(email)) {
    res.status(401);
    throw new Error("Please use a valid email address!");
  }

  // Strong password pattern.
  const strongPasswordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  // Validate that incoming password matches regex pattern.
  if (!strongPasswordRegex.test(password)) {
    res.status(401);
    throw new Error("Password needs to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter!")
  }

  // First use bcrypt to hash incoming password
  bcrypt
    .hash(password, saltRounds)
    // Create new user with the hashed password
    .then((hashedPassword) =>
      Users.create({
        email,
        fullName,
        password: hashedPassword,
      })
        .then((newUser) => {
          // add user to session.
          req.session.user = newUser;

          // redirect to user profile.
          res.redirect("/users/account");
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            res.status(500);
            throw new Error(error.message);
          } else if (error.code === 11000) {
            res.status(500);
            throw new Error("Email is already used, your email needs to be unique!");
          } else {
            next(error);
          }
        })
    )
    .catch((err) => next(err));
});

//@description     Update account details
//@route           POST /users/account/editDetails
//@access          Public
const performUpdateUserDetails = asyncHandler(async (req, res, next) => {
  const { userInfo, fullName, email } = req.body;

  if (!fullName && !email) {
    res.status(401);
    throw new Error("You cannot submit empty fields!")
  }

  const emailFormatRegex = /^\S+@\S+\.\S+$/;
  if (!emailFormatRegex.test(email)) {
    res.status(401);
    throw new Error("Please use a valid email address!");
  }

  await Users.findOne({ email: email }) // TODO: finds itself, must find only other users
    .then(() => {
      res.status(401);
      throw new Error("Email address is already in use!");
    });

  await Users.findOneAndUpdate(
    { email: email },
    {
      email: email,
      fullName: fullName,
    },
    { returnNewDocument: true })
    .then((user) => {
      req.session.user = user;
      res.send({ user: req.session.user });
    })
    .catch((err) => next(err));
});

//@description     Update account details
//@route           POST /users/account/updateType
//@access          Public
const performUpdateUserType = asyncHandler(async (req, res, next) => {
  const { email, userType } = req.body;

  await Users.findOneAndUpdate(
    { email: email },
    {
      email: email,
      type: userType,
    },
    { returnNewDocument: true }
  )
    .catch((err) => next(err));

  Users.findOne(
    { email: email }
  )
    .then((user) => {
      res.send({ user });
    })
});

//@description     Update account voucher count
//@route           POST /users/account/update_vouchers
//@access          Public
const performUpdateVouchers = asyncHandler(async (req, res, next) => {
  const { email, vouchers } = req.body;

  await Users.findOneAndUpdate(
    { email: email },
    { vouchers: vouchers }
  ).catch((error) => { next(error) })
});

//@description     Delete an account
//@route           POST /account/delete
//@access          Public
const performDeleteAccount = asyncHandler((req, res, next) => {
  const { email } = req.body;

  Users.findOneAndDelete({ email: email })
    .then(() => {
      res.send(email);
    })
    .catch((error) => next(error));
});


module.exports = {
  showLoginPage,
  showRegisterPage,
  showAccountPage,
  showDetailsPage,
  performUserAuthentication,
  performUserRegistration,
  performUpdateUserDetails,
  performUpdateUserType,
  performUpdateVouchers,
  performLogout,
  performDeleteAccount,
};
