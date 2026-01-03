import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// HR/Admin creates employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, role, companyName } = req.body;

    if (!name || !email || !phone || !role || !companyName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const year = new Date().getFullYear();
    const companyCode = companyName.split(" ").map(w => w[0]).join("").toUpperCase();
    const nameParts = name.trim().split(" ");
    const first = nameParts[0] || "XX";
    const last = nameParts[1] || "YY";
    const initials = (first.slice(0, 2) + last.slice(0, 2)).toUpperCase();

    const count = await User.countDocuments({
      createdAt: {
        $gte: new Date(`${year}-01-01T00:00:00.000Z`),
        $lte: new Date(`${year}-12-31T23:59:59.999Z`)
      }
    });

    const serial = String(count + 1).padStart(4, "0");
    const employeeId = `${companyCode}${initials}${year}${serial}`;

    const tempPassword = `Ab@${Math.floor(10000 + Math.random() * 90000)}`;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = new User({
      employeeId,
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      mustChangePassword: true
    });

    await user.save();

    res.status(201).json({
      message: "Employee created successfully",
      employeeId,
      tempPassword
    });
  } catch (err) {
    console.error("CreateEmployee error:", err);
    res.status(500).json({ error: "Server error during employee creation" });
  }
};

// Employee login
export const signIn = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    if (!employeeId || !password) {
      return res.status(400).json({ message: "Employee ID and password are required" });
    }

    const user = await User.findOne({ employeeId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ token, user: userData });
  } catch (err) {
    console.error("SignIn error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

// First login → change password
export const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashed = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(req.user._id, {
      password: hashed,
      mustChangePassword: false
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("ChangePassword error:", err);
    res.status(500).json({ error: "Server error during password update" });
  }
};
