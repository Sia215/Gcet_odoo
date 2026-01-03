// backend/controllers/leaveController.js
const Leave = require("../models/Leave");

// Employee: apply for leave
exports.applyLeave = async (req, res) => {
  try {
    if (!req.user || !req.user.employeeId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { type, from, to, remarks } = req.body;

    const leave = await Leave.create({
      employeeId: req.user.employeeId,
      type,
      from,
      to,
      remarks,
      status: "Pending",
    });

    return res.status(201).json(leave);
  } catch (err) {
    console.error("applyLeave error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// Employee: see only own leaves
exports.getMyLeaves = async (req, res) => {
  try {
    if (!req.user || !req.user.employeeId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const leaves = await Leave.find({
      employeeId: req.user.employeeId,
    }).sort({ createdAt: -1 });

    return res.json(
      leaves.map((l) => ({
        id: l._id,
        type: l.type,
        from: l.from,
        to: l.to,
        status: l.status,
      }))
    );
  } catch (err) {
    console.error("getMyLeaves error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// Admin: see all leaves
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });

    return res.json(
      leaves.map((l) => ({
        id: l._id,
        employee: l.employeeId, // just show employeeId
        type: l.type,
        status: l.status,
      }))
    );
  } catch (err) {
    console.error("getAllLeaves error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// Admin: approve leave
exports.approveLeave = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admins only" });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = "Approved";
    await leave.save();

    return res.json({ message: "Leave approved" });
  } catch (err) {
    console.error("approveLeave error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// Admin: reject leave
exports.rejectLeave = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admins only" });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = "Rejected";
    await leave.save();

    return res.json({ message: "Leave rejected" });
  } catch (err) {
    console.error("rejectLeave error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};
