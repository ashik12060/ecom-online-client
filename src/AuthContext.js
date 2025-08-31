import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");
  const [lastPrivatePath, setLastPrivatePath] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is authenticated from localStorage
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (callback) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Persist authentication state
    callback();
    navigate(redirectPath);
  };

  const logout = (callback) => {
    setIsAuthenticated(false);
    callback();
    localStorage.removeItem("isAuthenticated"); // Remove authentication state
    // Check if the current path is a private path
    if (location.pathname === lastPrivatePath) {
      navigate("/login");
    }
  };

  const setPrivateRedirectPath = (path) => {
    setLastPrivatePath(path);
  };

  // Define setCurrentUser function
  const setCurrentUser = (user) => {
    // Do something with the user, if needed
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setRedirectPath,
        setPrivateRedirectPath,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
