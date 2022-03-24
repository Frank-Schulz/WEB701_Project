const express = require('express');
const {
  showToken,
  performTokenAdd,
  performTokenDelete,
  performTokenValidation, } = require('../controllers/token.controllers');

const router = express.Router();

/* ------------------------------- GET ROUTES ------------------------------- */

// GET route ==> to display a token.
router.get("/:id", showToken);

/* ------------------------------- POST ROUTES ------------------------------ */

// POST route ==> to add a token.
router.post("/add", performTokenAdd);

// POST route ==> to delete a token.
router.post("/delete/:id", performTokenDelete);

// POST route ==> to validate a token.
router.post("/validate/:id", performTokenValidation);

module.exports = router;
