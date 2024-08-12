const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getEarningsHistory,
  addEarnings,
} = require("../controllers/earningController");

router.get("/", auth, getEarningsHistory);
router.post("/", auth, addEarnings);

module.exports = router;
