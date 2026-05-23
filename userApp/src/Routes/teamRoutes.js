const express = require("express");

const router = express.Router();

const teamController = require("../controllers/teamController");

const isAuthenticated = require("../middleware/authMiddleware");



router.post(
    "/teams/create",
    isAuthenticated,
    teamController.createTeam
);



router.post(
    "/teams/join/:id",
    isAuthenticated,
    teamController.joinTeam
);



router.get(
    "/teams/:id",
    isAuthenticated,
    teamController.getTeamDashboard
);



router.post(
    "/teams/invite",
    isAuthenticated,
    teamController.inviteMember
);



module.exports = router;