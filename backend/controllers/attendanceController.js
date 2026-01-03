const attendanceSchema =require("../models/Attendance")

export const checkIn = async (req, res) => {
  try {
    const { date, checkInTime } = req.body;
    const attendance = new Attendance({
      employee: req.user.id,
      date,
      status: "Present",
      checkInTime
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkOut = async (req, res) => {
  try {
    const { date, checkOutTime } = req.body;
    const attendance = await Attendance.findOne({ employee: req.user.id, date });
    if (!attendance) return res.status(404).json({ message: "Check-in not found" });

    attendance.checkOutTime = checkOutTime;
    const start = new Date(`1970-01-01T${attendance.checkInTime}:00Z`);
    const end = new Date(`1970-01-01T${checkOutTime}:00Z`);
    attendance.workingHours = (end - start) / (1000 * 60 * 60);
    await attendance.save();

    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ employee: req.user.id });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
