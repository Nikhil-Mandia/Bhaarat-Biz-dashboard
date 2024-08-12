const express = require("express");
const router = express.Router();
const RewardController = require("../controllers/rewardController");

router.get("/earned/:userId", RewardController.getEarnedRewards);

router.get("/upcoming/:userId", RewardController.getUpcomingRewards);

module.exports = router;
