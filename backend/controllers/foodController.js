const FoodMenu = require("../models/FoodMenu");

exports.getMenu = async (req, res) => {
  try {
    const menu = await FoodMenu.find().sort({
      day: 1,
    });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu", error: error.message });
  }
};

exports.setMenu = async (req, res) => {
  try {
    const { day, breakfast, lunch, dinner } = req.body;

    if (!day) {
      return res.status(400).json({ message: "Day is required" });
    }

    const menu = await FoodMenu.findOneAndUpdate(
      { day },
      { day, breakfast, lunch, dinner, updatedAt: Date.now() },
      { new: true, upsert: true },
    );

    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error setting menu", error: error.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const menu = await FoodMenu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu entry not found" });
    }
    res.json({ message: "Menu entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu", error: error.message });
  }
};
