import { useEffect, useState } from 'react';
import client from '../api/client';
import NavBar from '../components/NavBar';

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    checkIn: '10:00',
    checkOut: '19:00',
    workHours: '09:00',
    extraHours: '01:00'
  });

  const loadMonth = async () => {
    setMsg('');
    const now = new Date();
    try {
      const { data } = await client.get('/attendance/mine', {
        params: { year: now.getFullYear(), month: now.getMonth() + 1 }
      });
      setRecords(data);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to load');
    }
  };

  useEffect(() => {
    loadMonth();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await client.post('/attendance/mark', form);
      setMsg('Attendance saved');
      loadMonth();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Attendance</h2>
        <form onSubmit={submit}>
          <label>Date</label>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <label>Check-in</label>
          <input value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
          <label>Check-out</label>
          <input value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
          <label>Work hours</label>
          <input value={form.workHours} onChange={(e) => setForm({ ...form, workHours: e.target.value })} />
          <label>Extra hours</label>
          <input value={form.extraHours} onChange={(e) => setForm({ ...form, extraHours: e.target.value })} />
          <button type="submit">Mark attendance</button>
        </form>
        {msg && <p>{msg}</p>}
        <h3>This month</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Check In</th><th>Check Out</th><th>Work</th><th>Extra</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.checkIn}</td>
                <td>{r.checkOut}</td>
                <td>{r.workHours}</td>
                <td>{r.extraHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
