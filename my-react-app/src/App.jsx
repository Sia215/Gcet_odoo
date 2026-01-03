
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import api from "./api";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AttendancePage from "./pages/AttendancePage";
import LeavePage from "./pages/LeavePage";
import PayrollPage from "./pages/PayrollPage";

function PrivateRoute({ user, roles, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("hrms_user")) || null
  );
  const navigate = useNavigate();

  const handleLogin = (data) => {
    localStorage.setItem("hrms_token", data.token);
    localStorage.setItem("hrms_user", JSON.stringify(data.user));
    setUser(data.user);
    if (data.user.role === "ADMIN") navigate("/admin");
    else navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("hrms_token");
    localStorage.removeItem("hrms_user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    api.get("/auth/ping").catch(() => {});
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage onLogin={handleLogin} />}
      />
      <Route
        path="/register"
        element={<RegisterPage onLogin={handleLogin} />}
      />

      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <EmployeeDashboard user={user} onLogout={handleLogout} />
          </PrivateRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <PrivateRoute user={user}>
            <AttendancePage user={user} onLogout={handleLogout} />
          </PrivateRoute>
        }
      />

      <Route
        path="/leave"
        element={
          <PrivateRoute user={user}>
            <LeavePage user={user} onLogout={handleLogout} />
          </PrivateRoute>
        }
      />

      <Route
        path="/payroll"
        element={
          <PrivateRoute user={user}>
            <PayrollPage user={user} onLogout={handleLogout} />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute user={user} roles={["ADMIN"]}>
            <AdminDashboard user={user} onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
