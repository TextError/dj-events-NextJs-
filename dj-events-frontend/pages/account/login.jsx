import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';

import Layout from '@/layout/Layout';
import { ToastContainer, toast } from 'react-toastify';

import styles from '@/styles/AuthForm.module.css';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [state, setState] = useState({ email: '', password: '' });
  const { email, password } = state;

  const { signIn, error } = useContext(AuthContext);

  useEffect(() => {
    toast(error);
    return;
  },[error])

  const onChange = ({ target: { name, value }}) => setState({ ...state, [name]: value });

  const onSubmit = (e) => {
    e.preventDefault()
    signIn({ email, password });
  };

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1><FaUser /> Log In</h1>
        <ToastContainer />
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input type='email' id='email' name='email' value={email} onChange={onChange} />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' value={password} name='password' onChange={onChange} />
          </div>
          <input type='submit' value='Login' className='btn' />
        </form>
        <p>Don't have an account? <Link href='/account/register'>Register</Link></p>
      </div>
    </Layout>
  )
}

export default Login;