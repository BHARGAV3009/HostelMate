const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  totalBeds: {
    type: Number,
    required: true,
  },
  occupied: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["available", "occupied"],
    default: "available",
  },
});

module.exports = mongoose.model("Room", roomSchema);
