const Payroll = require("../models/Payroll");

exports.getMyPayroll = async (req, res) => {
  try {
    const latest = await Payroll.findOne({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    if (!latest) {
      return res.json({ month: "N/A", basic: 0, net: 0 });
    }
    return res.json({
      month: latest.month,
      basic: latest.basic,
      net: latest.net
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllPayroll = async (req, res) => {
  try {
    const records = await Payroll.find().populate("user", "email").lean();
    return res.json(
      records.map((p) => ({
        employee: p.user?.email || "Unknown",
        month: p.month,
        net: p.net
      }))
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
