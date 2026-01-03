import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./RegisterPage.css";


function RegisterPage({ onLogin }) {
  const [form, setForm] = useState({
    employeeId: "",
    email: "",
    password: "",
    role: "EMPLOYEE"
  });
  const [error, setError] = useState("");

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/signup", form);
      onLogin(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="register-root">
      <div className="register-card">
        <div className="register-left">
          <h1 className="register-title">HRMS Sign Up</h1>
          <p className="register-text">
            Create an account to manage attendance, leave requests and payroll
            in one place.
          </p>
          <div className="register-note">
            <p>• In real system, HR generates login ID for employees.</p>
            <p>• You can use this form for demo registration.</p>
          </div>
        </div>

        <div className="register-right">
          <h2 className="register-subtitle">Create your account</h2>

          {error && <p className="register-error">Sign up failed: {error}</p>}

          <form className="register-form" onSubmit={submit}>
            <div className="form-group">
              <label>Employee ID</label>
              <input
                name="employeeId"
                value={form.employeeId}
                onChange={change}
                placeholder="OIODJO20250001"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={change}
                placeholder="employee@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={change}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={form.role}
                onChange={change}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin / HR</option>
              </select>
            </div>

            <button type="submit" className="btn-primary">
              Create account
            </button>
          </form>

          <p className="register-footer">
            Already registered?{" "}
            <Link to="/login" className="link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
