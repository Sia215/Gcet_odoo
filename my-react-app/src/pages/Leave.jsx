import { useEffect, useState } from "react";
import axios from "../api/axios";

const Leave = () => {
  const [form, setForm] = useState({ leaveType: "Paid", startDate: "", endDate: "", reason: "" });
  const [leaves, setLeaves] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const applyLeave = async (e) => {
    e.preventDefault();
    await axios.post("/leaves", form);
    loadLeaves();
  };

  const loadLeaves = async () => {
    const res = await axios.get("/leaves");
    setLeaves(res.data);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Leave Application</h2>
      <form onSubmit={applyLeave} className="space-y-2 mb-6">
        <select name="leaveType" className="w-full p-2 border rounded" onChange={handleChange}>
          <option value="Paid">Paid</option>
          <option value="Sick">Sick</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        <input type="date" name="startDate" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="date" name="endDate" className="w-full p-2 border rounded" onChange={handleChange} />
        <textarea name="reason" placeholder="Reason" className="w-full p-2 border rounded" onChange={handleChange}></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
      </form>
      <ul className="space-y-2">
        {leaves.map((l, i) => (
          <li key={i} className="border p-2 rounded">
            {l.leaveType} from {l.startDate} to {l.endDate} — {l.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leave;
