import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      index: true // Optional: improves lookup performance
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
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
