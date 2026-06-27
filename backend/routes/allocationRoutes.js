const express = require("express");
const router = express.Router();

const { assignRoom, getAllAllocations, deallocate } = require("../controllers/allocationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/all", authMiddleware, roleMiddleware("admin"), getAllAllocations);
router.post("/assign", authMiddleware, roleMiddleware("admin"), assignRoom);
router.put("/vacate/:id", authMiddleware, roleMiddleware("admin"), deallocate);

module.exports = router;
