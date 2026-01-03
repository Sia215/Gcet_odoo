import { useState } from 'react';
import client from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function FirstLoginChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await client.post('/auth/change-password', { oldPassword, newPassword });
      localStorage.setItem('mustChangePassword', 'false');
      navigate('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Change password failed');
    }
  };

  return (
    <div className="container">
      <h2>Change password (first login)</h2>
      <form onSubmit={submit}>
        <label>Old password</label>
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <label>New password</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button type="submit">Update Password</button>
      </form>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
    </div>
  );
}
