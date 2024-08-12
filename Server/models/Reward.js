const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  earnedDate: { type: Date, required: true },
  progress: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Reward", RewardSchema);
