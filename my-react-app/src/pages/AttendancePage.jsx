import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api";
import "./AttendancePage.css";

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
      <div className="att-root">
        <div className="att-container">
          <div className="att-actions">
            <button onClick={mark} className="att-button">
              Check-in / Check-out
            </button>
            {message && <p className="att-message">{message}</p>}
          </div>

          <div className="att-card">
            <table className="att-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{r.date}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AttendancePage;
