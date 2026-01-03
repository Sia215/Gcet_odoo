import { Link } from "react-router-dom";

function Layout({ user, onLogout, title, children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-slate-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-semibold mb-4">HRMS</h2>
        <nav className="space-y-2 text-sm">
          <Link to="/" className="block hover:text-indigo-300">
            Employee Dashboard
          </Link>
          <Link to="/attendance" className="block hover:text-indigo-300">
            Attendance
          </Link>
          <Link to="/leave" className="block hover:text-indigo-300">
            Leave / Time Off
          </Link>
          <Link to="/payroll" className="block hover:text-indigo-300">
            Payroll
          </Link>
          {user?.role === "ADMIN" && (
            <Link to="/admin" className="block hover:text-indigo-300">
              Admin Dashboard
            </Link>
          )}
        </nav>
        <div className="mt-6 text-xs text-slate-300">
          Logged in as: {user?.email} ({user?.role})
        </div>
        <button onClick={onLogout} className="btn mt-4 w-full">
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 bg-slate-100">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        {children}
      </main>
    </div>
  );
}

export default Layout;
