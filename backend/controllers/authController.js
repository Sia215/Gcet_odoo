import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    const user = await User.findOne({ employeeId, active: true });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { sub: user._id, employeeId: user.employeeId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      mustChangePassword: user.mustChangePassword,
      role: user.role,
      employeeId: user.employeeId
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const ok = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Old password incorrect' });

    const hash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hash;
    user.mustChangePassword = false;
    await user.save();

    res.json({ message: 'Password changed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
