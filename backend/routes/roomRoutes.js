const express = require("express");
const router = express.Router();

const {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/all", authMiddleware, roleMiddleware("admin"), getRooms);
router.post("/create", authMiddleware, roleMiddleware("admin"), createRoom);
router.put("/update/:id", authMiddleware, roleMiddleware("admin"), updateRoom);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteRoom,
);

module.exports = router;
