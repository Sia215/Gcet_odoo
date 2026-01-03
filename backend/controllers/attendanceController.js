import Attendance from '../models/Attendance.js';

export const markAttendance = async (req, res) => {
  try {
    const { date, checkIn, checkOut, workHours, extraHours, breaks } = req.body;
    const employeeId = req.user.employeeId;
    const d = new Date(date);

    const record = await Attendance.findOneAndUpdate(
      { employeeId, date: d },
      { employeeId, date: d, checkIn, checkOut, workHours, extraHours, breaks },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: 'Attendance saved', record });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyAttendanceMonth = async (req, res) => {
  try {
    const employeeId = req.user.employeeId;
    const { year, month } = req.query; // month: 1-12
    const start = new Date(Number(year), Number(month) - 1, 1);
    const end = new Date(Number(year), Number(month), 0, 23, 59, 59);

    const records = await Attendance.find({
      employeeId,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTodayAttendanceForAdmins = async (_req, res) => {
  try {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const records = await Attendance.find({ date: { $gte: start, $lte: end } }).sort({ employeeId: 1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
