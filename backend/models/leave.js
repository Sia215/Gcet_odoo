// backend/models/Leave.js
const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true }, // or user: { type: ObjectId, ref: "User" }
    type: { type: String, required: true },       // "Paid" | "Sick" | ...
    from: { type: String, required: true },
    to: { type: String, required: true },
    remarks: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);
