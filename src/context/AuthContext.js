// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if the user is logged in based on localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
    setIsLoggedIn(true); // Set logged-in state to true
  };

  const logout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setIsLoggedIn(false); // Set logged-in state to false
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
