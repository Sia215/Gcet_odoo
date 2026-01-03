exports.getMyPayroll = async (req, res) => {
  return res.json({ month: "Jan 2026", basic: 50000, net: 48000 });
};

exports.getAllPayroll = async (req, res) => {
  return res.json([
    { employee: "John Doe", month: "Jan 2026", net: 48000 }
  ]);
};
