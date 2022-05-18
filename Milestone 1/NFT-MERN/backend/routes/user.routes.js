const express = require('express');
const {
  showAccountPage,
  showLoginPage,
  showRegisterPage,
  performAccountUpdate,
  performAccountDelete,
  performLogout,
  performUserSwitchType,
  performUserAuthentication,
  performUserRegistration,
  performDistributeVouchers, } = require('../controllers/user.controllers');

const router = express.Router();

/* ------------------------------- GET ROUTES ------------------------------- */

// GET route ==> to render the profile page of the user.
router.get("/account/:id", showAccountPage);

// GET route ==> to show the login page
router.get("/login", showLoginPage);

// GET route ==> to show the register page
router.get("/register", showRegisterPage);

/* ------------------------------- POST ROUTES ------------------------------ */

// POST route ==> to edit the account details.
router.post("/account/update/:id", performAccountUpdate);

// POST route ==> to delete the account
router.post("/account/delete/:id", performAccountDelete);

// POST route ==> to log out user and destroy the session
router.post("/logout/:id", performLogout);

// POST route ==> to switch between user types
router.post("/switchUserType/:id", performUserSwitchType);

// POST route ==> to log in user
router.post("/login", performUserAuthentication);

// POST route ==> to register the user
router.post("/register", performUserRegistration);

// POST route ==> to give vouchers to all users
router.post("/distributeVouchers", performDistributeVouchers);

module.exports = router;
