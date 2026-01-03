import { Link } from "react-router-dom";
import "./Layout.css";

function Layout({ user, onLogout, title, children }) {
  return (
    <div className="layout-root">
      <header className="layout-header">
        <div className="layout-header-left">
          <div className="layout-brand">HRMS</div>
          <nav className="layout-top-nav">
            <Link to="/">Employee Dashboard</Link>
            <Link to="/attendance">Attendance</Link>
            <Link to="/leave">Leave / Time Off</Link>
            <Link to="/payroll">Payroll</Link>
            {user?.role === "ADMIN" && <Link to="/admin">Admin Dashboard</Link>}
          </nav>
        </div>
        <div className="layout-header-right">
          <div>Logged in as: {user?.email} ({user?.role})</div>
          <button
            onClick={onLogout}
            style={{
              marginLeft: 8,
              padding: "4px 8px",
              borderRadius: 999,
              border: "none",
              background: "#ef4444",
              color: "#f9fafb",
              fontSize: 11,
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="layout-body">
        {/* no sidebar now; main content full width */}
        <main className="layout-main">
          <h1 className="layout-title">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
