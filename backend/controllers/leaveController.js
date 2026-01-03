exports.applyLeave = async (req, res) => {
  return res.status(201).json({ message: "Leave applied (dummy)" });
};

exports.getMyLeaves = async (req, res) => {
  return res.json([
    {
      id: 1,
      type: "Sick",
      status: "Approved",
      from: "2026-01-01",
      to: "2026-01-02"
    }
  ]);
};

exports.getAllLeaves = async (req, res) => {
  return res.json([
    { id: 1, employee: "John Doe", type: "Sick", status: "Pending" }
  ]);
};

exports.approveLeave = async (req, res) => {
  return res.json({ message: "Leave approved (dummy)" });
};

exports.rejectLeave = async (req, res) => {
  return res.json({ message: "Leave rejected (dummy)" });
};
