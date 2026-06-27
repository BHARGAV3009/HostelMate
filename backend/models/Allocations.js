const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  allocatedDate: {
    type: Date,
    default: Date.now,
  },
  vacatedDate: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["Allocated", "Vacated"],
    default: "Allocated",
  },
});

module.exports = mongoose.model("Allocation", allocationSchema);
