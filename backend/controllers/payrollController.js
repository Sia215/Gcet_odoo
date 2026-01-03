// backend/controllers/payrollController.js
const Payroll = require("../models/Payroll");

// Employee: latest payroll
exports.getMyPayroll = async (req, res) => {
  try {
    if (!req.user || !req.user.employeeId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const latest = await Payroll.findOne({ employeeId: req.user.employeeId })
      .sort({ createdAt: -1 })
      .lean();

    if (!latest) {
      return res.json({ month: "N/A", basic: 0, net: 0 });
    }

    return res.json({
      month: latest.month,
      basic: latest.basic,
      net: latest.net,
    });
  } catch (err) {
    console.error("getMyPayroll error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// Admin: all employees' payroll
exports.getAllPayroll = async (req, res) => {
  try {
    const records = await Payroll.find()
      .populate("user", "email employeeId")
      .lean();

    return res.json(
      records.map((p) => ({
        employee: p.user?.email || p.employeeId || "Unknown",
        month: p.month,
        net: p.net,
      }))
    );
  } catch (err) {
    console.error("getAllPayroll error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};
