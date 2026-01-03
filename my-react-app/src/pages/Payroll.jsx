import { useEffect, useState } from "react";
import axios from "../api/axios";

const Payroll = () => {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await axios.get("/payroll/me");
        setPayroll(res.data);
      } catch (err) {
        console.error("Error fetching payroll:", err);
        alert("Failed to load payroll data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Payroll</h2>

      {loading ? (
        <p>Loading payroll data...</p>
      ) : payroll.length === 0 ? (
        <p>No payroll records found.</p>
      ) : (
        <div className="space-y-4">
          {payroll.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <p><strong>Month:</strong> {item.month}</p>
              <p><strong>Basic:</strong> ₹{item.basic}</p>
              <p><strong>HRA:</strong> ₹{item.hra}</p>
              <p><strong>Other Allowances:</strong> ₹{item.allowances}</p>
              <p><strong>Deductions:</strong> ₹{item.deductions}</p>
              <p><strong>Net Salary:</strong> ₹{item.netSalary}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payroll;
