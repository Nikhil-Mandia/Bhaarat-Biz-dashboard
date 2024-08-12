const mongoose = require("mongoose");

const NetworkTreeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "NetworkTree" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("NetworkTree", NetworkTreeSchema);
