// backend/models/Attendance.js
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true }, // match your index
    date: { type: String, required: true },       // "2026-01-03"
    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Present",
    },
  },
  { timestamps: true }
);

// Ensure unique per employee per day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
