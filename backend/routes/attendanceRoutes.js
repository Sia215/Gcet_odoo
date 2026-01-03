import express from "express";
import Attendance from "../models/Attendance.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

// Get logged-in employee's attendance
router.get("/me", authMiddleware, async (req, res) => {
  const records = await Attendance.find({ employeeId: req.user.employeeId });
  res.json(records);
});

// Admin: Get today's attendance
router.get("/today", authMiddleware, async (req, res) => {
  if (req.user.role !== "ADMIN") return res.status(403).json({ message: "Access denied" });

  const today = new Date().toISOString().slice(0, 10);
  const records = await Attendance.find({ date: { $regex: today } });
  res.json(records);
});

export default router;
