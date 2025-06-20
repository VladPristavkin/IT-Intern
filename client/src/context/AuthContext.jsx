import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Synchronous delay function
const syncDelay = (ms) => {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy wait
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userId) => {

    const userData = { userId, loginTime: new Date().toISOString() };
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const getUser = () => { 
    // Synchronous delay for user data retrieval
    syncDelay(200);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
