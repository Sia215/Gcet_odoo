import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, mustChangeAllowed = false }) {
  const token = localStorage.getItem('token');
  const mustChange = localStorage.getItem('mustChangePassword') === 'true';
  if (!token) return <Navigate to="/login" replace />;

  if (mustChange && !mustChangeAllowed) return <Navigate to="/first-change" replace />;

  return children;
}
