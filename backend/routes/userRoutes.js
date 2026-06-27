const express = require("express");
const router = express.Router();

const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/students", authMiddleware, roleMiddleware("admin"), getStudents);
router.post(
  "/students",
  authMiddleware,
  roleMiddleware("admin"),
  createStudent,
);
router.put(
  "/students/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateStudent,
);
router.delete(
  "/students/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteStudent,
);

module.exports = router;
