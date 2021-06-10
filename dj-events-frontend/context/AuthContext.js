import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null);

  // Register User
  const register = async ({ username, email, password }) => {

  };

  // Login User
  const signIn = async ({ email: identifier, password }) => {

  };

  // Logout User
  const signOut = async () => {

  };

  // Check User
  const checkIfUser = async ({ username, email, password }) => {

  };

  return (
    <AuthContext.Provider value={{ user, error, register, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;