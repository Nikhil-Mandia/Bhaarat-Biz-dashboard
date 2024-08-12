const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  performance: { type: String, required: true },
  contact: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming a User model exists
});

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
