const mongoose = require("mongoose");

const noticesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["resolved", "under progress", "pending"],
    default: "pending",
  },
});
module.exports = mongoose.model("Notices", noticesSchema);
