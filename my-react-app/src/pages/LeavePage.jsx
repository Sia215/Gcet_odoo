import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api";

function LeavePage({ user, onLogout }) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    type: "Paid",
    from: "",
    to: "",
    remarks: ""
  });

  const load = async () => {
    const res = await api.get("/leaves/me");
    setList(res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/leaves", form);
    setForm({ type: "Paid", from: "", to: "", remarks: "" });
    load();
  };

  return (
    <Layout user={user} onLogout={onLogout} title="Leave / Time Off">
      <div className="grid gap-4 md:grid-cols-2">
        <form className="card space-y-3" onSubmit={submit}>
          <h2 className="font-semibold">Apply for Leave</h2>
          <div>
            <label className="block text-sm mb-1">Leave type</label>
            <select
              name="type"
              value={form.type}
              onChange={change}
              className="w-full border rounded px-3 py-2"
            >
              <option>Paid</option>
              <option>Sick</option>
              <option>Unpaid</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm mb-1">From</label>
              <input
                type="date"
                name="from"
                value={form.from}
                onChange={change}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">To</label>
              <input
                type="date"
                name="to"
                value={form.to}
                onChange={change}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Remarks</label>
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={change}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>
          <button className="btn w-full" type="submit">
            Submit Leave
          </button>
        </form>

        <div className="card overflow-x-auto">
          <h2 className="font-semibold mb-2">My Leave Requests</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">From</th>
                <th className="py-2 text-left">To</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((l) => (
                <tr key={l.id} className="border-b">
                  <td className="py-1">{l.type}</td>
                  <td className="py-1">{l.from}</td>
                  <td className="py-1">{l.to}</td>
                  <td className="py-1">{l.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default LeavePage;
