const User = require("../models/Users");
const bcrypt = require("bcrypt");

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Students",
      error: error.message,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingStudent = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phoneNumber,
      role: "student",
    });

    const studentResponse = user.toObject();
    delete studentResponse.password;

    res.status(201).json(studentResponse);
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    ).select("-password");
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error: error.message,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    });
  }
};
