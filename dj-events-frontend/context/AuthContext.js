import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null);
  const { push } = useRouter();

  useEffect(() => { checkIfUser() },[]);

  // Register User
  const register = async ({ username, email, password }) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const { user, message } = await res.json();

    if(res.ok) {
      setUser(user);
      push('/account/dashboard');
    } else {
      setError(message);
      setError(null);
    }
  };

  // Login User
  const signIn = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });

    const { user, message} = await res.json();

    if(res.ok) {
      setUser(user);
      push('/account/dashboard');
    } else {
      setError(message);
      setError(null);
    }
  };

  // Logout User
  const signOut = async () => {
    const res = await fetch(`${NEXT_URL}/api/signOut`, {
      method: 'POST'
    });

    if(res.ok) {
      setUser(null);
      push('/');
    }
  };

  // Check User
  const checkIfUser = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const { user } = await res.json();

    if(res.ok) return setUser(user);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, register, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;