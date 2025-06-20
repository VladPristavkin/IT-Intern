import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        // Simulate network delay for initial auth check
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (userId) => {
    setIsLoading(true);
    // Simulate network delay for login
    await new Promise(resolve => setTimeout(resolve, 600));
    const userData = { userId, loginTime: new Date().toISOString() };
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    // Simulate network delay for logout
    await new Promise(resolve => setTimeout(resolve, 400));
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
  };

  const getUser = async () => {
    // Small delay for user data retrieval
    await new Promise(resolve => setTimeout(resolve, 200));
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;