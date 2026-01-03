import { createContext, useContext, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("hrms_user")) || null
  );

  const login = async (email, password) => {
    const res = await axiosClient.post("/auth/signin", { email, password });
    localStorage.setItem("hrms_token", res.data.token);
    localStorage.setItem("hrms_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  const register = async (payload) => {
    const res = await axiosClient.post("/auth/signup", payload);
    localStorage.setItem("hrms_token", res.data.token);
    localStorage.setItem("hrms_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("hrms_token");
    localStorage.removeItem("hrms_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
