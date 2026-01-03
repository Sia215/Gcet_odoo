import Payroll from "../models/Payroll.js";

export const getMyPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.find({ employee: req.user.id });
    res.status(200).json(payroll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("employee", "name email");
    res.status(200).json(payrolls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createOrUpdatePayroll = async (req, res) => {
  try {
    const { employee, month, basicSalary, allowances, deductions } = req.body;
    const netSalary = basicSalary + allowances - deductions;
    const payroll = await Payroll.findOneAndUpdate(
      { employee, month },
      { basicSalary, allowances, deductions, netSalary },
      { upsert: true, new: true }
    );
    res.status(200).json(payroll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
