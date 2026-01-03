import { useState } from 'react';
import client from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const { data } = await client.post('/auth/login', { employeeId, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('employeeId', data.employeeId);
      localStorage.setItem('mustChangePassword', String(data.mustChangePassword));
      if (data.mustChangePassword) navigate('/first-change');
      else navigate('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form onSubmit={submit}>
        <label>Employee ID</label>
        <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
      <p>Note: Employees cannot self-register. Contact HR/Admin.</p>
    </div>
  );
}
