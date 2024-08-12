const mongoose = require("mongoose");

const PerformanceSchema = new mongoose.Schema({
  month: String,
  sales: Number,
  revenue: Number,
  growth: Number,
});

module.exports = mongoose.model("Performance", PerformanceSchema);
