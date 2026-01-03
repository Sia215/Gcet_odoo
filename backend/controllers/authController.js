const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const genToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, employeeId: user.employeeId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

exports.signup = async (req, res) => {
  try {
    const { employeeId, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      employeeId,
      email,
      password: hashed,
      role
    });

    return res.status(201).json({
      token: genToken(user),
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    return res.json({
      token: genToken(user),
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
