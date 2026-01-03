const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

// employee
router.post("/", protect, attendanceController.markAttendance);
router.get("/me", protect, attendanceController.getMyAttendance);

// admin
router.get(
  "/",
  protect,
  allowRoles("ADMIN"),
  attendanceController.getAllAttendance
);

module.exports = router;
