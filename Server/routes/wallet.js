const express = require("express");
const router = express.Router();
const WalletController = require("../controllers/walletController");
const auth = require("../middleware/auth");

router.get("/balance", auth, WalletController.getWalletBalance);

router.get("/transactions", auth, WalletController.getTransactions);

router.post("/withdraw", auth, WalletController.withdrawFunds);

router.post("/transfer", auth, WalletController.transferFunds);

module.exports = router;
