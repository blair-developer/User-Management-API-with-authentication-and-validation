const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

const isAuthenticated = require("../middleware/authMiddleware");

const isAdmin = require("../middleware/adminMiddleware");

router.get(
    "/admin/dashboard",
    isAuthenticated,
    isAdmin,
    adminController.getAdminDashboard
);

router.get(
    "/admin/delete-user/:id",
    isAuthenticated,
    isAdmin,
    adminController.deleteUser
);

router.get(
    "/admin/delete-task/:id",
    isAuthenticated,
    isAdmin,
    adminController.deleteTask
);

module.exports = router;