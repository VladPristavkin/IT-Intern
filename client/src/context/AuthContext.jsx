import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalStorageService, { STORAGE_KEYS } from '../services/localStorageService';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const token = LocalStorageService.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const userData = LocalStorageService.getItem(STORAGE_KEYS.USER_DATA);
    
    if (token && userData) {
      setUser(userData);
      // Перенаправляем на соответствующую страницу
      redirectToUserPage(userData);
    }
  }, []);

  const redirectToUserPage = (userData) => {
    if (userData.isAdmin) {
      navigate('/teacher/admin/applications');
    } else if (userData.role === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/student');
    }
  };

  const login = (userData) => {
    setUser(userData);
    LocalStorageService.setItem(STORAGE_KEYS.USER_DATA, userData);
    
    // Генерируем токен
    const token = btoa(JSON.stringify({
      userId: userData.id,
      role: userData.role,
      isAdmin: userData.isAdmin
    }));
    LocalStorageService.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

    // Перенаправляем пользователя
    redirectToUserPage(userData);
  };

  const logout = () => {
    setUser(null);
    LocalStorageService.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    LocalStorageService.removeItem(STORAGE_KEYS.USER_DATA);
    navigate('/');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

