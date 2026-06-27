const express = require("express");
const router = express.Router();

const { getMenu, setMenu, deleteMenu } = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, getMenu);

router.post("/", authMiddleware, roleMiddleware("admin"), setMenu);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMenu);

module.exports = router;
