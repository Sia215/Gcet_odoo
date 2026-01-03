import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    employeeId: { type: String, unique: true, required: true }, // e.g., OIDODO20240001
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['EMPLOYEE', 'HR', 'ADMIN'], default: 'EMPLOYEE' },
    mustChangePassword: { type: Boolean, default: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
