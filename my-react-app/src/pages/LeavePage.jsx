import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api";
import "./LeavePage.css";

function LeavePage({ user, onLogout }) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    type: "Paid",
    from: "",
    to: "",
    remarks: "",
  });
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/leaves/me");
      setList(res.data || []);
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Failed to load your leaves"
      );
    }
  };

  useEffect(() => {
    load();
  }, []);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/leaves", form);
      setForm({ type: "Paid", from: "", to: "", remarks: "" });
      setMessage("Leave submitted");
      load();
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Failed to submit leave"
      );
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} title="Leave / Time Off">
      <div className="leave-root">
        <div className="leave-container">
          {/* Apply for leave */}
          <div className="leave-card">
            <h2>Apply for Leave</h2>
            {message && <p className="leave-message">{message}</p>}
            <form className="leave-form" onSubmit={submit}>
              <div className="leave-group">
                <label>Leave type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={change}
                >
                  <option>Paid</option>
                  <option>Sick</option>
                  <option>Unpaid</option>
                </select>
              </div>

              <div className="leave-dates">
                <div className="leave-group">
                  <label>From</label>
                  <input
                    type="date"
                    name="from"
                    value={form.from}
                    onChange={change}
                    required
                  />
                </div>
                <div className="leave-group">
                  <label>To</label>
                  <input
                    type="date"
                    name="to"
                    value={form.to}
                    onChange={change}
                    required
                  />
                </div>
              </div>

              <div className="leave-group">
                <label>Remarks</label>
                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={change}
                  rows={3}
                />
              </div>

              <button className="leave-submit" type="submit">
                Submit Leave
              </button>
            </form>
          </div>

          {/* My leave requests */}
          <div className="leave-card">
            <h2>My Leave Requests</h2>
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((l) => (
                  <tr key={l.id}>
                    <td>{l.type}</td>
                    <td>{l.from}</td>
                    <td>{l.to}</td>
                    <td>{l.status}</td>
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

export default LeavePage;
