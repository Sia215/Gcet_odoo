import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, unique: true, required: true },
    companyCode: { type: String, required: true }, // e.g., OI
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    yearOfJoining: { type: Number, required: true },
    serialNo: { type: Number, required: true }, // 1..N per year
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);
