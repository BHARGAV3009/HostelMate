const Allocation = require("../models/Allocations");
const Room = require("../models/Room");

exports.assignRoom = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    if (!userId || !roomId) {
      return res
        .status(400)
        .json({ message: "userId and roomId are required" });
    }

    const existing = await Allocation.findOne({
      userId,
      status: "Allocated",
    });

    if (existing) {
      return res.status(400).json({
        message: "User already has an allocated room",
      });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.occupied >= room.totalBeds) {
      return res.status(400).json({ message: "Room is fully occupied" });
    }

    const allocation = await Allocation.create({
      userId,
      roomId,
    });

    room.occupied += 1;

    if (room.occupied === room.totalBeds) {
      room.status = "occupied";
    }

    await room.save();

    res.status(201).json({
      message: "Room assigned successfully",
      allocation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error assigning room",
      error: error.message,
    });
  }
};

exports.getAllAllocations = async (req, res) => {
  try {
    const allocations = await Allocation.find()
      .populate("userId", "name email phoneNumber")
      .populate("roomId", "roomNumber totalBeds occupied status");
    res.json(allocations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching allocations", error: error.message });
  }
};

exports.deallocate = async (req, res) => {
  try {
    const allocation = await Allocation.findById(req.params.id);
    if (!allocation) {
      return res.status(404).json({ message: "Allocation not found" });
    }

    if (allocation.status === "Vacated") {
      return res.status(400).json({ message: "Already vacated" });
    }

    allocation.status = "Vacated";
    allocation.vacatedDate = new Date();
    await allocation.save();

    const room = await Room.findById(allocation.roomId);
    if (room) {
      room.occupied = Math.max(0, room.occupied - 1);
      if (room.occupied < room.totalBeds) {
        room.status = "available";
      }
      await room.save();
    }

    res.json({ message: "Room vacated successfully", allocation });
  } catch (error) {
    res.status(500).json({ message: "Error deallocating", error: error.message });
  }
};
