const express = require("express");
const router = express.Router();

const {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticesController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/all", authMiddleware, roleMiddleware("admin"), getNotices);
router.get("/:id", authMiddleware, roleMiddleware("admin"), getNoticeById);
router.post("/new", authMiddleware, roleMiddleware("admin"), createNotice);
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateNotice,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteNotice,
);

module.exports = router;
