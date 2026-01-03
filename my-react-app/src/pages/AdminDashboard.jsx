import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api";

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
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card overflow-x-auto">
          <h2 className="font-semibold mb-2">Employees</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">ID</th>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="border-b">
                  <td className="py-1">{e.id}</td>
                  <td className="py-1">{e.name}</td>
                  <td className="py-1">{e.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card overflow-x-auto">
          <h2 className="font-semibold mb-2">Leave Approvals</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Employee</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l.id} className="border-b">
                  <td className="py-1">{l.employee}</td>
                  <td className="py-1">{l.type}</td>
                  <td className="py-1">{l.status}</td>
                  <td className="py-1 space-x-2">
                    <button
                      onClick={() => approve(l.id)}
                      className="px-2 py-1 text-xs rounded bg-green-600 text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(l.id)}
                      className="px-2 py-1 text-xs rounded bg-red-600 text-white"
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
    </Layout>
  );
}

export default AdminDashboard;
