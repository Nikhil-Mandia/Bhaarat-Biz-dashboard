const Earnings = require("../models/Earning");

// Get earnings history
exports.getEarningsHistory = async (req, res) => {
  try {
    const earningsHistory = await Earnings.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(earningsHistory);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add new earnings record
exports.addEarnings = async (req, res) => {
  const { sales, commissions, bonuses } = req.body;

  try {
    const newEarnings = new Earnings({
      userId: req.user.id,
      sales,
      commissions,
      bonuses,
    });

    await newEarnings.save();

    // Emit the earnings update through Socket.IO
    req.io.emit("earningsUpdate", newEarnings);

    res.status(201).json(newEarnings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
