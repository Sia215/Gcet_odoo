import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <span>HRMS</span>
      <div>
        {role === 'HR' || role === 'ADMIN' ? <button onClick={() => navigate('/admin/create')}>Create Employee</button> : null}
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button onClick={() => navigate('/attendance')}>Attendance</button>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
