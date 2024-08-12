const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

exports.getWalletBalance = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    res.json({ balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.withdrawFunds = async (req, res) => {
  const { amount } = req.body;
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    if (wallet.balance < amount)
      return res.status(400).json({ message: "Insufficient funds" });

    wallet.balance -= amount;
    await wallet.save();

    await Transaction.create({
      userId: req.user.id,
      type: "Withdrawal",
      amount,
    });

    res.json({ balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.transferFunds = async (req, res) => {
  const { amount, recipient } = req.body;
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    if (wallet.balance < amount)
      return res.status(400).json({ message: "Insufficient funds" });

    const recipientWallet = await Wallet.findOne({ userId: recipient });
    if (!recipientWallet)
      return res.status(404).json({ message: "Recipient wallet not found" });

    wallet.balance -= amount;
    await wallet.save();

    recipientWallet.balance += amount;
    await recipientWallet.save();

    await Transaction.create({
      userId: req.user.id,
      type: "Transfer",
      amount,
      recipient,
    });
    await Transaction.create({
      userId: recipient,
      type: "Transfer",
      amount,
      recipient: req.user.id, // The sender
    });

    res.json({ balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
