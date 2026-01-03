import { useEffect, useState } from "react";
import axios from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("/users/me").then(res => setUser(res.data)).catch(() => alert("Failed to load profile"));
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Employee ID:</strong> {user.employeeId}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Profile;
