import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create Context
const AuthContext = createContext();

// Context Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store logged-in user
  const [error, setError] = useState('');

  // Register User
  const register = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      setError('');
      alert(response.data.message); // Notify success
    } catch (err) {
      setError('Registration failed!');
    }
  };

  // Login User
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setUser(response.data.user); // Save logged-in user
      setError('');
      alert('Login successful!');
    } catch (err) {
      setError('Login failed!');
    }
  };

  // Logout User
  const logout = () => {
    setUser(null);
    alert('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );    
};

// Custom Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
