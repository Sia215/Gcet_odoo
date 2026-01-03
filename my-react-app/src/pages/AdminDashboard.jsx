import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api";
import "./AdminDashboard.css";

function AdminDashboard({ user, onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const load = async () => {
    const [empRes, leaveRes] = await Promise.all([
      api.get("/employees"),
      api.get("/leaves")
    ]);
    setEmployees(empRes.data || []);
    setLeaves(leaveRes.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    await api.patch(`/leaves/${id}/approve`);
    load();
  };

  const reject = async (id) => {
    await api.patch(`/leaves/${id}/reject`);
    load();
  };

  return (
    <Layout user={user} onLogout={onLogout} title="Admin / HR Dashboard">
      <div className="admin-root">
        <div className="admin-container">
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
