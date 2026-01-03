import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api";
import "./AdminDashboard.css";

function AdminDashboard({ user, onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const [empRes, leaveRes] = await Promise.all([
        api.get("/employees"),
        api.get("/leaves"), // admin endpoint -> getAllLeaves
      ]);
      setEmployees(empRes.data || []);
      setLeaves(leaveRes.data || []);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Failed to load admin data"
      );
    }
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    try {
      // backend route is POST /leaves/:id/approve
      await api.post(`/leaves/${id}/approve`);
      load();
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Failed to approve leave"
      );
    }
  };

  const reject = async (id) => {
    try {
      // backend route is POST /leaves/:id/reject
      await api.post(`/leaves/${id}/reject`);
      load();
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Failed to reject leave"
      );
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} title="Admin / HR Dashboard">
      <div className="admin-root">
        <div className="admin-container">
          {message && <p className="admin-message">{message}</p>}
          <div className="admin-grid">
            {/* Employees card */}
            <div className="admin-card">
              <h2>Employees</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Leave approvals card */}
            <div className="admin-card">
              <h2>Leave Approvals</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((l) => (
                    <tr key={l.id}>
                      <td>{l.employee}</td>
                      <td>{l.type}</td>
                      <td>{l.status}</td>
                      <td className="admin-actions">
                        <button
                          onClick={() => approve(l.id)}
                          className="admin-approve"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reject(l.id)}
                          className="admin-reject"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
