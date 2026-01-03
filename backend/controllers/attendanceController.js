// backend/controllers/attendanceController.js
const Attendance = require("../models/Attendance");

// Employee: toggle today's attendance
exports.markAttendance = async (req, res) => {
  try {
    if (!req.user || !req.user.employeeId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const employeeId = req.user.employeeId;
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Check if today's attendance already exists
    const existing = await Attendance.findOne({ employeeId, date: today });

    if (existing) {
      // Toggle Present/Absent for demo
      existing.status = existing.status === "Present" ? "Absent" : "Present";
      await existing.save();
      return res.json({ message: "Attendance updated", record: existing });
    }

    // Create new record as Present
    const record = await Attendance.create({
      employeeId,
      date: today,
      status: "Present",
    });

    return res.status(201).json({ message: "Attendance marked", record });
  } catch (err) {
    console.error("markAttendance error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// Employee: see only own attendance
exports.getMyAttendance = async (req, res) => {
  try {
    if (!req.user || !req.user.employeeId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const rows = await Attendance.find({
      employeeId: req.user.employeeId,
    }).sort({ date: -1 });

    const mapped = rows.map((r) => ({
      date: r.date,
      status: r.status,
    }));

    return res.json(mapped);
  } catch (err) {
    console.error("getMyAttendance error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// Admin: see all employees' attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const rows = await Attendance.find().sort({ date: -1 });

    const mapped = rows.map((r) => ({
      employeeId: r.employeeId,
      date: r.date,
      status: r.status,
    }));

    return res.json(mapped);
  } catch (err) {
    console.error("getAllAttendance error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};
