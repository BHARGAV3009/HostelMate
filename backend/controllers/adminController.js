const User = require("../models/Users");
const Room = require("../models/Room");
const Complaint = require("../models/Complaint");
const Payment = require("../models/Payments");
const Allocation = require("../models/Allocations");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ status: "occupied" });
    const availableRooms = await Room.countDocuments({ status: "available" });
    const activeAllocations = await Allocation.countDocuments({ status: "Allocated" });

    const pendingComplaints = await Complaint.countDocuments({ status: "pending" });
    const inProgressComplaints = await Complaint.countDocuments({ status: "in_progress" });
    const resolvedComplaints = await Complaint.countDocuments({ status: "resolved" });

    const pendingPayments = await Payment.countDocuments({ status: "pending" });
    const paidPayments = await Payment.countDocuments({ status: "paid" });

    const paidPaymentDocs = await Payment.find({ status: "paid" });
    const totalRevenue = paidPaymentDocs.reduce((sum, p) => sum + p.amount, 0);

    const pendingPaymentDocs = await Payment.find({ status: "pending" });
    const pendingAmount = pendingPaymentDocs.reduce((sum, p) => sum + p.amount, 0);

    const recentComplaints = await Complaint.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name")
      .populate("roomId", "roomNumber");

    const recentPayments = await Payment.find()
      .sort({ paymentDate: -1 })
      .limit(5)
      .populate("userId", "name");

    res.json({
      totalStudents,
      totalRooms,
      occupiedRooms,
      availableRooms,
      activeAllocations,
      pendingComplaints,
      inProgressComplaints,
      resolvedComplaints,
      pendingPayments,
      paidPayments,
      totalRevenue,
      pendingAmount,
      recentComplaints,
      recentPayments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};
