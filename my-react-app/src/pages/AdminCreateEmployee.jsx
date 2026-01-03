import { useState } from 'react';
import client from '../api/client';

export default function AdminCreateEmployee() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    yearOfJoining: new Date().getFullYear()
  });
  const [msg, setMsg] = useState('');
  const [created, setCreated] = useState(null);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const { data } = await client.post('/employees', form);
      setCreated(data.employee);
      setMsg('Employee created successfully');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Creation failed');
    }
  };

  return (
    <div className="container">
      <h2>Create employee (HR/Admin)</h2>
      <form onSubmit={submit}>
        <label>First name</label>
        <input name="firstName" value={form.firstName} onChange={change} />
        <label>Last name</label>
        <input name="lastName" value={form.lastName} onChange={change} />
        <label>Email</label>
        <input name="email" value={form.email} onChange={change} />
        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={change} />
        <label>Year of joining</label>
        <input name="yearOfJoining" type="number" value={form.yearOfJoining} onChange={change} />
        <button type="submit">Create</button>
      </form>
      {msg && <p>{msg}</p>}
      {created && (
        <div>
          <p><b>Employee ID:</b> {created.employeeId}</p>
          <p><b>Name:</b> {created.firstName} {created.lastName}</p>
        </div>
      )}
    </div>
  );
}
