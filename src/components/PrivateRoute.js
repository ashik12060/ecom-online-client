import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';


export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuth();

  const location = useLocation();

  return !isLoggedIn ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    children
  );
}
