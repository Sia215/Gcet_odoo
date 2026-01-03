import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true },
    date: { type: Date, required: true },
    checkIn: { type: String, required: true },   // "10:00"
    checkOut: { type: String, required: true },  // "19:00"
    workHours: { type: String, required: true }, // "09:00"
    extraHours: { type: String, default: '00:00' },
    breaks: [{ start: String, end: String }]
  },
  { timestamps: true }
);

// Ensure one record per day per employee
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
