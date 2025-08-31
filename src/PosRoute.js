// components/PosRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PosRoute = ({ children }) => {
  const {
    isAuthenticated,
    user, // user object should contain the role
    setRedirectPath,
    setPrivateRedirectPath,
  } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    setRedirectPath(location.pathname);
    return <Navigate to="/login" />;
  }

  // Check if user is 'moderator' or 'coadmin'
  if (!["moderator", "coadmin"].includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  setPrivateRedirectPath(location.pathname);

  return children;
};

export default PosRoute;
