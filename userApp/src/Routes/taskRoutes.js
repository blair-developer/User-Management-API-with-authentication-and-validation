const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

const isAuthenticated = require("../middleware/authMiddleware");

router.get(
    "/home",
    isAuthenticated,
    taskController.getHome
);

router.post(
    "/add-task",
    isAuthenticated,
    taskController.addTask
);

router.get(
    "/delete-task/:id",
    isAuthenticated,
    taskController.deleteTask
);

router.get(
    "/edit-task/:id",
    isAuthenticated,
    taskController.getEditTask
);

router.post(
    "/edit-task/:id",
    isAuthenticated,
    taskController.editTask
);

module.exports = router;