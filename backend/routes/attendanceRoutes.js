// backend/routes/attendanceRoutes.js
const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.post("/", protect, attendanceController.markAttendance);

router.get("/me", protect, attendanceController.getMyAttendance);

router.get(
  "/",
  protect,
  allowRoles("ADMIN"),
  attendanceController.getAllAttendance
);

module.exports = router;
