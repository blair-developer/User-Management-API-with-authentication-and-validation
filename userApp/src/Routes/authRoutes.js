const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

router.get("/", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/signup", authController.signupUser);

router.post("/login", authController.loginUser);

router.get("/logout", authController.logoutUser);

module.exports = router;s