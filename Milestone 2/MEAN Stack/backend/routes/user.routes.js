const express = require('express');
const {
  showLoginPage,
  showRegisterPage,
  performLogout,
  performUserAuthentication,
  performUserRegistration, } = require('../controllers/user.controllers');

const router = express.Router();

/* ------------------------------- GET ROUTES ------------------------------- */

// GET route ==> to show the login page
router.get("/login", showLoginPage);

// GET route ==> to show the register page
router.get("/register", showRegisterPage);

/* ------------------------------- POST ROUTES ------------------------------ */

// POST route ==> to log out user and destroy the session
router.post("/logout/:id", performLogout);

// POST route ==> to log in user
router.post("/login", performUserAuthentication);

// POST route ==> to register the user
router.post("/register", performUserRegistration);

module.exports = router;
