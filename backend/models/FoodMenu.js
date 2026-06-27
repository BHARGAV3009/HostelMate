const mongoose = require("mongoose");

const foodMenuSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  breakfast: {
    type: String,
    default: "",
  },
  lunch: {
    type: String,
    default: "",
  },
  dinner: {
    type: String,
    default: "",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FoodMenu", foodMenuSchema);
