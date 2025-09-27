const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/register", authController.registerUser);
router.post("/login", passport.authenticate("local"), authController.loginUser);
router.get("/logout", authController.logoutUser);

module.exports = router;
