const Leave = require("../models/Leave");
const User = require("../models/user");

exports.applyLeave = async (req, res) => {
  try {
    const { type, from, to, remarks } = req.body;
    const leave = await Leave.create({
      user: req.user.id,
      type,
      from,
      to,
      remarks
    });
    return res.status(201).json(leave);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(
      leaves.map((l) => ({
        id: l._id,
        type: l.type,
        from: l.from,
        to: l.to,
        status: l.status
      }))
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("user", "email");
    return res.json(
      leaves.map((l) => ({
        id: l._id,
        employee: l.user?.email || "Unknown",
        type: l.type,
        status: l.status
      }))
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    leave.status = "Approved";
    await leave.save();
    return res.json({ message: "Leave approved" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    leave.status = "Rejected";
    await leave.save();
    return res.json({ message: "Leave rejected" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
