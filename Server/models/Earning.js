const mongoose = require("mongoose");

const earningsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sales: {
    type: Number,
    required: true,
    default: 0,
  },
  commissions: {
    type: Number,
    required: true,
    default: 0,
  },
  bonuses: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Earnings", earningsSchema);
