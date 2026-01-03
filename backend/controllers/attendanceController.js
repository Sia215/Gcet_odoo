exports.markAttendance = async (req, res) => {
  return res.status(201).json({ message: "Attendance marked (dummy)" });
};

exports.getMyAttendance = async (req, res) => {
  return res.json([
    { date: "2026-01-01", status: "Present" },
    { date: "2026-01-02", status: "Absent" }
  ]);
};

exports.getAllAttendance = async (req, res) => {
  return res.json([
    { employee: "John Doe", date: "2026-01-01", status: "Present" }
  ]);
};
