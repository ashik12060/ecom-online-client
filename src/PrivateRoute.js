import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, setRedirectPath, setPrivateRedirectPath } =
    useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    setRedirectPath(location.pathname);
    return <Navigate to="/login" />;
  }

  // Set the last accessed private route
  setPrivateRedirectPath(location.pathname);

  return children;
};

export default PrivateRoute;
