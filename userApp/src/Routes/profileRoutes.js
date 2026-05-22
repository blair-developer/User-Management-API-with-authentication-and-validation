const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profileController");

const isAuthenticated = require("../middleware/authMiddleware");

router.get(
    "/profile",
    isAuthenticated,
    profileController.getProfile
);

router.get(
    "/edit-profile",
    isAuthenticated,
    profileController.getEditProfile
);

router.post(
    "/edit-profile",
    isAuthenticated,
    profileController.updateProfile
);

module.exports = router;