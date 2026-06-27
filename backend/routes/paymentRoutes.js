const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPayments,
  getPaymentById,
  deletePayment,
} = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/all", authMiddleware, roleMiddleware("admin"), getPayments);
router.post("/new", authMiddleware, roleMiddleware("admin"), createPayment);
router.get("/:id", authMiddleware, getPaymentById);
router.delete("/delete/:id", authMiddleware, roleMiddleware("admin"), deletePayment);

module.exports = router;
