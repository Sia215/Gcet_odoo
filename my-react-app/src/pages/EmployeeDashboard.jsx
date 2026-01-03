import { Link } from "react-router-dom";
import "./EmployeeDashboard.css";

function EmployeeDashboard({ user, onLogout }) {
  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">HRMS</div>
        <nav className="dashboard-nav">
          <Link to="/">Employee Dashboard</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/leave">Leave / Time Off</Link>
          <Link to="/payroll">Payroll</Link>
        </nav>
        <div className="dashboard-user">
          Logged in as: {user?.email} ({user?.role})
        </div>
        <button onClick={onLogout} className="dashboard-logout">
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Employee Dashboard</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Profile</h2>
            <p>View your personal, job and salary details.</p>
            <button className="dashboard-button" type="button">
              Open Profile
            </button>
          </div>
          <div className="dashboard-card">
            <h2>Attendance</h2>
            <p>Check in, check out and see day-wise attendance.</p>
            <Link to="/attendance" className="dashboard-button">
              Go to Attendance
            </Link>
          </div>
          <div className="dashboard-card">
            <h2>Leave / Time Off</h2>
            <p>Apply for leave and track approval status.</p>
            <Link to="/leave" className="dashboard-button">
              Go to Leave
            </Link>
          </div>
          <div className="dashboard-card">
            <h2>Payroll</h2>
            <p>View salary details and payslip summary.</p>
            <Link to="/payroll" className="dashboard-button">
              Go to Payroll
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;
