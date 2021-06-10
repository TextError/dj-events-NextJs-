import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null);
  const { push } = useRouter();

  useEffect(() => {
    checkIfUser();
    push('/account/dashboard');
  },[]);

  // Register User
  const register = async ({ username, email, password }) => {

  };

  // Login User
  const signIn = async ({ email: identifier, password }) => {
    const res = await (await fetch(`${NEXT_URL}/api/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    })).json();

    if(res.ok) {
      setUser(res.user)
    } else {
      setError(res.message)
      setError(null);
    }


  };

  // Logout User
  const signOut = async () => {

  };

  // Check User
  const checkIfUser = async ({ username, email, password }) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    if(res.ok) return setUser(data.user);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, register, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;