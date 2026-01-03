import { useState } from "react";
import axios from "../api/axios";

const Register_user = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", employeeId: "", role: "EMPLOYEE" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", form);
      alert("Registered successfully");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>
        <input name="employeeId" placeholder="Employee ID" className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="name" placeholder="Name" className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleChange} />
        <select name="role" className="w-full p-2 border rounded" onChange={handleChange}>
          <option value="EMPLOYEE">Employee</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
      </form>
    </div>
  );
};

export default Register_user;
