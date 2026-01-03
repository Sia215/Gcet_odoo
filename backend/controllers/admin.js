import bcrypt from "bcryptjs";
import Employee from "../models/employee.js";

const generateEmployeeId = async (companyCode, firstName, lastName, year) => {
  const prefix = `${companyCode}${firstName.slice(0, 2).toUpperCase()}${lastName.slice(0, 2).toUpperCase()}${year}`;
  const count = await Employee.countDocuments({ joinYear: year }) + 1;
  const serial = String(count).padStart(4, "0");
  return `${prefix}${serial}`;
};

export const createEmployee = async (req, res) => {
  try {
    const { companyName, firstName, lastName, email, phone, logoUrl } = req.body;
    const year = new Date().getFullYear();
    const companyCode = companyName.split(" ").map(w => w[0]).join("").toUpperCase();

    const employeeId = await generateEmployeeId(companyCode, firstName, lastName, year);
    const tempPassword = `Ab@${Math.floor(10000 + Math.random() * 90000)}`;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newEmployee = await Employee.create({
      companyName,
      firstName,
      lastName,
      email,
      phone,
      logoUrl,
      employeeId,
      password: hashedPassword,
      joinYear: year,
      serialNo: parseInt(employeeId.slice(-4))
    });

    res.status(201).json({
      message: "Employee created successfully",
      employeeId,
      tempPassword
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
