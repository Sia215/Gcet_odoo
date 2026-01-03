import bcrypt from 'bcryptjs';
import Employee from '../models/Employee.js';
import User from '../models/User.js';
import { generateEmployeeId } from '../utils/idGenerator.js';
import { sendCredentials } from '../utils/emailService.js';

export const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, yearOfJoining } = req.body;
    const companyCode = process.env.COMPANY_CODE || 'OI';
    const year = yearOfJoining || new Date().getFullYear();

    const { employeeId, serialNo } = await generateEmployeeId(
      companyCode,
      firstName,
      lastName,
      year
    );

    // Generate temp password
    const tempPassword = Math.random().toString(36).slice(-8) + 'A@1';
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    // Create Employee record
    const emp = await Employee.create({
      employeeId,
      companyCode,
      firstName,
      lastName,
      email,
      phone,
      yearOfJoining: year,
      serialNo
    });

    // Create User (login) record
    const user = await User.create({
      employeeId,
      email,
      phone,
      passwordHash,
      role: 'EMPLOYEE',
      mustChangePassword: true
    });

    // Notify via email/sms (stub)
    if (email) await sendCredentials({ to: email, employeeId, tempPassword });

    res.status(201).json({
      message: 'Employee created',
      employee: {
        employeeId,
        firstName,
        lastName,
        email,
        phone,
        yearOfJoining: year
      }
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate record' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const listEmployees = async (_req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
