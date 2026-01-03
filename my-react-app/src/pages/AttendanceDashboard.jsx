import { useEffect, useState } from "react";
import axios from "../api/axios";

const AttendanceDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState({ present: 0, leaves: 0, total: 0 });

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/attendance/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAttendance(res.data);
      const present = res.data.filter(r => !r.isLeave).length;
      const leaves = res.data.filter(r => r.isLeave).length;
      setSummary({ present, leaves, total: res.data.length });
    };

    fetchAttendance();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded shadow">Days Present: {summary.present}</div>
        <div className="bg-yellow-100 p-4 rounded shadow">Leaves: {summary.leaves}</div>
        <div className="bg-blue-100 p-4 rounded shadow">Total Days: {summary.total}</div>
      </div>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Date</th>
            <th className="p-2">Check In</th>
            <th className="p-2">Check Out</th>
            <th className="p-2">Work Hours</th>
            <th className="p-2">Extra Hours</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((day) => (
            <tr key={day._id} className="border-t">
              <td className="p-2">{new Date(day.date).toLocaleDateString()}</td>
              <td className="p-2">{day.checkIn || "-"}</td>
              <td className="p-2">{day.checkOut || "-"}</td>
              <td className="p-2">{day.workHours || "-"}</td>
              <td className="p-2">{day.extraHours || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDashboard;
