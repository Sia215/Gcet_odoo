const User = require("../models/user");

exports.getEmployees = async (req, res) => {
  try {
    const users = await User.find().select("employeeId email role").lean();
    return res.json(
      users.map((u) => ({
        id: u.employeeId,
        name: u.email,
        role: u.role
      }))
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  // optional: for now just echo
  return res.status(201).json({ message: "Implement create employee later" });
};
