const mongoose = require("mongoose");

const UpcomingRewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("UpcomingReward", UpcomingRewardSchema);
