import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Импортируем как именованный экспорт

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUser(decodedToken); // Вы можете извлекать необходимые данные из токена
      } catch (error) {
        console.error('Invalid token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('jwtToken', token);
    const decodedToken = jwtDecode(token);
    setIsAuthenticated(true);
    setUser(decodedToken);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

