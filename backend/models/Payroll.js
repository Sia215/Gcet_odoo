import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    month: {
      type: String,
      required: true
    },

    basicSalary: {
      type: Number,
      required: true
    },

    allowances: {
      type: Number,
      default: 0
    },

    deductions: {
      type: Number,
      default: 0
    },

    netSalary: {
      type: Number,
      required: true
    },

    isPaid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payroll", payrollSchema);
