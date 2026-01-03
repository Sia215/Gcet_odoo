import { useState, useEffect } from "react";
import axios from '../api/axios';


const Attendance = () => {
  const [records, setRecords] = useState([]);

  const checkIn = async () => {
    await axios.post("/attendance/checkin", { date: new Date(), checkInTime: new Date().toLocaleTimeString() });
    loadAttendance();
  };

  const checkOut = async () => {
    await axios.post("/attendance/checkout", { date: new Date(), checkOutTime: new Date().toLocaleTimeString() });
    loadAttendance();
  };

  const loadAttendance = async () => {
    const res = await axios.get("/attendance");
    setRecords(res.data);
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Attendance</h2>
      <div className="space-x-4 mb-4">
        <button onClick={checkIn} className="bg-green-500 text-white px-4 py-2 rounded">Check In</button>
        <button onClick={checkOut} className="bg-red-500 text-white px-4 py-2 rounded">Check Out</button>
      </div>
      <ul className="space-y-2">
        {records.map((r, i) => (
          <li key={i} className="border p-2 rounded">
            {r.date} — {r.checkInTime} to {r.checkOutTime || "N/A"} ({r.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
