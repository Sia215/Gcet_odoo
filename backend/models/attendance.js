import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  date: { type: Date, required: true },
  checkIn: String,
  checkOut: String,
  workHours: String,
  extraHours: String,
  isLeave: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);
