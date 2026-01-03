import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["EMPLOYEE", "ADMIN"],
      default: "EMPLOYEE"
    },

    phone: {
      type: String
    },

    address: {
      type: String
    },

    department: {
      type: String
    },

    designation: {
      type: String
    },

    salary: {
      type: Number
    },

    profileImage: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
