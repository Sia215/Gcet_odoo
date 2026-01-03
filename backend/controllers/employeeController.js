exports.getEmployees = async (req, res) => {
  // later you can connect to Employee model
  return res.json([
    { id: 1, name: "John Doe", role: "Developer" },
    { id: 2, name: "Jane Smith", role: "Designer" }
  ]);
};

exports.createEmployee = async (req, res) => {
  return res.status(201).json({ message: "Employee created (dummy)" });
};
