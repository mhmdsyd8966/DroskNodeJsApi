const express = require("express");
const router = express.Router();
const authenticationController = require("../Controllers/AuthController");

// Register route
router.post("/register", authenticationController.register);

// Login route
router.post("/login", authenticationController.login);

// Refresh token route
router.post("/refresh-token", authenticationController.refreshToken);

// Logout route
router.post("/logout", authenticationController.logout);

module.exports = router;
