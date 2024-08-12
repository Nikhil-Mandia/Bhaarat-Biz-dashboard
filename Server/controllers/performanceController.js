const Performance = require("../models/Performance");

exports.getPerformanceData = async (req, res) => {
  try {
    const performanceData = await Performance.aggregate([
      {
        $group: {
          _id: null,
          labels: { $push: "$month" },
          sales: { $push: "$sales" },
          revenue: { $push: "$revenue" },
          growth: { $push: "$growth" },
        },
      },
      {
        $project: {
          _id: 0,
          labels: 1,
          sales: 1,
          revenue: 1,
          growth: 1,
        },
      },
    ]);

    res.json(performanceData[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
