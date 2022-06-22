const express = require('express');
const {
    showLoginPage,
    showRegisterPage,
    showAccountPage,
    performUserAuthentication,
    performLogout,
    performUserRegistration,
    performUpdateUserDetails,
    performUpdateUserType,
    performUpdateVouchers,
    performDeleteAccount, } = require('../controllers/user.controllers');

const router = express.Router();

/* ------------------------------- GET ROUTES ------------------------------- */

// GET route ==> to show the login page
router.get("/login", showLoginPage);

// GET route ==> to show the register page
router.get("/register", showRegisterPage);

// GET route ==> to render the profile page of the user
router.get("/account", showAccountPage);

/* ------------------------------- POST ROUTES ------------------------------ */

// POST route ==> to log in user
router.post('/login', performUserAuthentication);

// POST route ==> to log out user and destroy the session
router.post("/logout", performLogout);

// POST route ==> to register the user
router.post('/register', performUserRegistration);

// POST route ==> to edit the account details
router.post("/account/editDetails", performUpdateUserDetails);

// UPDATE route ==> to update the account type
router.post("/account/updateType", performUpdateUserType);

// UPDATE route ==> to update the account
router.patch("account/update_vouchers", performUpdateVouchers);

// POST route ==> to delete the account
router.post("/account/delete", performDeleteAccount);

module.exports = router;
