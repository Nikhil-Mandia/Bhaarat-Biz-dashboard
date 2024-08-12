const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/teamController");

router.get("/members/:userId", TeamController.getTeamMembers);

router.get("/network/:userId", TeamController.getNetworkTree);

module.exports = router;
