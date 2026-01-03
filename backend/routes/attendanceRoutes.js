import express from "express";
import { checkIn, checkOut, getAttendance } from "../controllers/attendanceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Employee check-in
router.post("/checkin", authMiddleware, checkIn);

// Employee check-out
router.post("/checkout", authMiddleware, checkOut);

// Get attendance records
router.get("/", authMiddleware, getAttendance);

export default router;
