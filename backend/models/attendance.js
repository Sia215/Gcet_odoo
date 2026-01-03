import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Half-day", "Leave"],
      required: true
    },

    checkInTime: {
      type: String
    },

    checkOutTime: {
      type: String
    },

    workingHours: {
      type: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("attendance", attendanceSchema);
