const express = require("express");

const router = express.Router();

const { loginUser, signUpUser } = require("../controllers/userController");

// ********************* LOGIN ********************* //
router.post("/login", loginUser);

// ********************* SIGNUP ********************* //
router.post("/signup", signUpUser);    

module.exports = router 