const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintById,
  deleteComplaintById,
} = require("../controllers/complaintController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/all", authMiddleware, roleMiddleware("admin"), getAllComplaints);
router.get("/:id", authMiddleware, roleMiddleware("admin"), getComplaintById);
router.post("/new", authMiddleware, roleMiddleware("admin"), createComplaint);
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateComplaintById,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteComplaintById,
);

module.exports = router;
