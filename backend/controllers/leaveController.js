import Leave from "../models/Leave.js";

export const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const leave = new Leave({
      employee: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason
    });
    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user.id });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminComment } = req.body;
    const leave = await Leave.findByIdAndUpdate(id, { status, adminComment }, { new: true });
    res.status(200).json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
