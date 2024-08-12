const express = require("express");
const router = express.Router();
const PerformanceController = require("../controllers/performanceController");

router.get("/", PerformanceController.getPerformanceData);

module.exports = router;
