import { useState } from "react";
import axios from "../api/axios";

function RegisterUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "EMPLOYEE",
    companyName: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/auth/create-employee", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Employee created!\nID: ${res.data.employeeId}\nPassword: ${res.data.tempPassword}`);
    } catch (err) {
      alert(err.response?.data?.message || "Creation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Employee (HR Only)</h2>
      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="companyName" placeholder="Company Name" onChange={handleChange} required />
      <button type="submit">Create Employee</button>
    </form>
  );
}

export default RegisterUser;
