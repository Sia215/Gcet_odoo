const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: String, required: true }, // "Jan 2026"
    basic: { type: Number, required: true },
    net: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", payrollSchema);
