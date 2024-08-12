const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      value: { type: Number, required: true },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
