import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  companyName: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  logoUrl: String,
  employeeId: { type: String, unique: true },
  password: String,
  role: { type: String, default: "EMPLOYEE" },
  mustChangePassword: { type: Boolean, default: true },
  joinYear: Number,
  serialNo: Number
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
