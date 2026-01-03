const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["Paid", "Sick", "Unpaid"], required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    remarks: String,
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);
