const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/:userId", UserController.getUserProfile);

module.exports = router;
