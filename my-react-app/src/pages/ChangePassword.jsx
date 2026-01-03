import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/auth/change-password", { newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem("mustChangePassword", "false");
      navigate("/dashboard");
    } catch (err) {
      alert("Password update failed");
    }
  };

  return (
    <form onSubmit={handleChange}>
      <h2>Change Your Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Update Password</button>
    </form>
  );
}

export default ChangePassword;
