const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const foodRoutes = require("./routes/foodRoutes");
const adminRoutes = require("./routes/adminRoutes");

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://hostel-mate-two.vercel.app",
  "http://localhost:5173",
];

const app = express();
// ✅ REPLACED: Allows your production domain, local machine, AND any dynamic Vercel preview link
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server or Postman requests
      if (!origin) return callback(null, true);

      const isLocalhost = origin.startsWith("http://localhost:");
      const isProductionVercel =
        origin === "https://hostel-mate-two.vercel.app";
      const isVercelPreview =
        origin.endsWith(".vercel.app") && origin.includes("hostel-mate");

      if (isLocalhost || isProductionVercel || isVercelPreview) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("HostelMate Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
