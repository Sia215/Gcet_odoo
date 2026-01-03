import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import FirstLoginChangePassword from './pages/FirstLoginChangePassword';
import AdminCreateEmployee from './pages/AdminCreateEmployee';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Attendance from './pages/Attendance';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/first-change" element={
          <ProtectedRoute mustChangeAllowed={true}>
            <FirstLoginChangePassword />
          </ProtectedRoute>
        } />
        <Route path="/admin/create" element={
          <ProtectedRoute>
            <AdminCreateEmployee />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        } />
        <Route path="/attendance" element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
