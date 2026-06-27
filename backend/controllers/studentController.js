const Allocation = require("../models/Allocations");
const Notice = require("../models/Notices");
const Complaint = require("../models/Complaint");
const Payment = require("../models/Payments");
const Room = require("../models/Room")

exports.getMyRoom = async (req, res) => {
  try {
    const allocation = await Allocation.findOne({
      userId: req.user.id,
      status: "Allocated",
    }).populate("roomId");

    if (!allocation) {
      return res.status(404).json({ message: "No allocated room found" });
    }
    res.status(200).json({
      roomNumber: allocation.roomId.roomNumber,
      totalBeds: allocation.roomId.totalBeds,
      occupied: allocation.roomId.occupied,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching room",
      error: error.message,
    });
  }
};

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching notices" });
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const allocation = await Allocation.findOne({
      userId: req.user.id,
      status: "Allocated",
    });
    if (!allocation) {
      return res
        .status(400)
        .json({ message: "You must be allocated a room to file a complaint" });
    }

    const issue = req.body.issue?.trim();

    if (!issue) {
      return res.status(400).json({ message: "Issue is required" });
    }

    const complaint = await Complaint.create({
      userId: req.user.id,
      roomId: allocation.roomId,
      issue: req.body.issue,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating complaint",
      error: error.message,
    });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user.id,
    }).populate("roomId");

    res.json(complaints);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching complaints", error: error.message });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      userId: req.user.id,
    });

    res.json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching payments", error: error.message });
  }
};

exports.payFee = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    payment.status = "paid";
    payment.paymentDate = new Date();
    await payment.save();
    res.json({ message: "Payment successful", payment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing payment", error: error.message });
  }
};

exports.vacateRoom = async (req, res) => {
  const allocation = await Allocation.findOne({
    userId: req.user.id,
    status: "Allocated",
  });

  if (allocation) {
    allocation.status = "Vacated";
    allocation.vacatedDate = new Date();
    await allocation.save();

    const room = await Room.findById(allocation.roomId);

    room.occupied -= 1;
    room.status = "available";
    await room.save();

    res.json({ message: "Room Vacated" });
  } else {
    res.status(400).json({ message: "Not allocated" });
  }
};
