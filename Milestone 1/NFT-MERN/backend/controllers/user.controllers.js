const asyncHandler = require('express-async-handler');
const generateToken = require("../utils/generateToken.js");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users = require('../models/user.model');
const jwt = require("jsonwebtoken");

const {
  JWT_SECRET,
  SESS_LIFETIME, } = process.env;

const saltRounds = 10;

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
  res.send({
    email: "",
    password: "",
    errorMessage: "",
  })
};

//@description     Show the register page
//@route           GET /users/register
//@access          Public
const showRegisterPage = (req, res) => {
  res.send({
    email: "",
    password: "",
    fullName: "",
    dateOfBith: "",
    errorMessage: "",
  })
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
  req.session.destroy();
  res.send(true);
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
      // if (user && bcrypt.compareSync(password, user.password)) {
      if (User.matchPassword(user.password)) {

        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id
        });

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

//@description     Register new user
//@route           POST /users/register
//@access          Public
const performUserRegistration = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    fullName,
  } = req.body;

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
        password: hashedPassword,
        fullName,
      })
        .then((newUser) => {
          // add user to session.
          req.session.user = newUser;

          // redirect to user profile.
          res.redirect("/user/account");
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
