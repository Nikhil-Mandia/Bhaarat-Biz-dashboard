const express = require("express");
const router = express.Router();
const NetworkController = require("../controllers/networkController");

router.get("/", NetworkController.getNetworkData);

module.exports = router;
