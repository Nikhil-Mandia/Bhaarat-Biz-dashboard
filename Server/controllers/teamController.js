const TeamMember = require("../models/TeamMember");
const NetworkTree = require("../models/NetworkTree");

exports.getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ userId: req.params.userId });
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNetworkTree = async (req, res) => {
  try {
    const networkTree = await NetworkTree.findOne({
      userId: req.params.userId,
    }).populate("children");
    res.json(networkTree);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
