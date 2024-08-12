const express = require("express");
const router = express.Router();
const { handleMessage } = require("../controllers/messageController");

router.post("/send", handleMessage);

module.exports = router;
