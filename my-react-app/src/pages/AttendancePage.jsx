import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api";

function AttendancePage({ user, onLogout }) {
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState("");

  const load = async () => {
    const res = await api.get("/attendance/me");
    setRows(res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const mark = async () => {
    await api.post("/attendance", { action: "toggle" });
    setMessage("Attendance marked (dummy)");
    load();
  };

  return (
    <Layout user={user} onLogout={onLogout} title="Attendance">
      <button onClick={mark} className="btn mb-4">
        Check-in / Check-out
      </button>
      {message && <p className="text-sm mb-2 text-green-600">{message}</p>}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b">
                <td className="py-1">{r.date}</td>
                <td className="py-1">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AttendancePage;
