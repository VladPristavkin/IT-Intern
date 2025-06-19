import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = 'https://localhost:7102/api'; // Adjust this to match your API URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_BASE_URL}/Auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        try {
          const response = await api.get('/User/profile');
          const userData = {
            ...response.data,
            roles: response.data.roles || [] // Ensure roles is always an array
          };
          console.log('Loaded user data:', userData); // Debug log
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (loginData) => {
    try {
      const requestData = {
        login: loginData.username,
        password: loginData.password
      };

      const response = await api.post('/Auth/login', requestData);
      
      if (!response.data) {
        throw new Error('Invalid server response');
      }

      const { accessToken, refreshToken, user: userData } = response.data;

      if (!accessToken || !refreshToken || !userData) {
        throw new Error('Incomplete authentication data');
      }

      // Ensure user data has all required fields
      const formattedUserData = {
        ...userData,
        roles: userData.roles || [] // Ensure roles is always an array
      };

      console.log('Login user data:', formattedUserData); // Debug log

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(formattedUserData));

      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser(formattedUserData);
      setIsAuthenticated(true);

      return formattedUserData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (registerData) => {
    try {
      const requestData = {
        login: registerData.username,
        email: registerData.email,
        password: registerData.password,
        fullName: registerData.name,
        courseNumber: registerData.year?.toString() || "1",
        groupNumber: registerData.speciality || "",
        department: registerData.department || "Computer Science"
      };

      const response = await api.post('/Auth/register', requestData);
      
      if (!response.data) {
        throw new Error('Invalid server response');
      }

      const { accessToken, refreshToken, user: userData } = response.data;

      if (!accessToken || !refreshToken || !userData) {
        throw new Error('Incomplete registration data');
      }

      // Ensure roles are properly formatted
      const formattedUserData = {
        ...userData,
        roles: userData.roles?.map(role => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase())
      };

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(formattedUserData));

      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser(formattedUserData);
      setIsAuthenticated(true);

      return formattedUserData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (isAuthenticated) {
        await api.post('/Auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      api.defaults.headers.common['Authorization'] = '';
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const requestData = {
        fullName: profileData.name,
        courseNumber: profileData.year?.toString() || "1",
        groupNumber: profileData.speciality || "",
        department: profileData.department || "Computer Science"
      };

      const response = await api.put('/User/profile', requestData);
      
      if (!response.data) {
        throw new Error('Invalid server response');
      }

      // Ensure roles are properly formatted
      const formattedUserData = {
        ...response.data,
        roles: response.data.roles?.map(role => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase())
      };

      setUser(formattedUserData);
      localStorage.setItem('user', JSON.stringify(formattedUserData));
      return formattedUserData;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const getUser = useCallback(() => {
    return user;
  }, [user]);

  if (loading) {
    return null; // or a loading spinner component
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        logout, 
        register, 
        getUser, 
        updateProfile,
        api // Expose the configured api instance for other components to use
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
