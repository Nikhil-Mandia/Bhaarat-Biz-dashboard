const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Deposit", "Withdrawal", "Transfer"],
      required: true,
    },
    amount: { type: Number, required: true },
    recipient: { type: String }, // Optional, used only for transfers
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
