const express = require("express");
const router = express.Router();
const {
  getMyRoom,
  getNotices,
  createComplaint,
  getMyComplaints,
  getMyPayments,
  payFee,
} = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/room", authMiddleware, getMyRoom);

router.get("/notices", authMiddleware, getNotices);

router.post("/complaints", authMiddleware, createComplaint);

router.get("/complaints", authMiddleware, getMyComplaints);

router.get("/payments", authMiddleware, getMyPayments);

router.put("/payments/:id/pay", authMiddleware, payFee);

module.exports = router;
