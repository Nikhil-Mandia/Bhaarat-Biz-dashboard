const Reward = require("../models/Reward");
const UpcomingReward = require("../models/UpcomingReward");

exports.getEarnedRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ userId: req.params.userId });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUpcomingRewards = async (req, res) => {
  try {
    const upcomingRewards = await UpcomingReward.find({
      userId: req.params.userId,
    });
    res.json(upcomingRewards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
