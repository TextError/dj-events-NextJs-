import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';

import Layout from '@/layout/Layout';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/AuthForm.module.css';

const Register = () => {
  const [state, setState] = useState({ username: '', email: '', password: '', password2: '' });
  const { username, email, password, password2 } = state;

  const { register, error } = useContext(AuthContext);

  useEffect(() => {
    toast.error(error);
    return;
  },[error])

  const onChange = ({ target: { name, value }}) => setState({ ...state, [name]: value });

  const onSubmit = (e) => {
    e.preventDefault();

    if(password !== password2) return toast('Passwords do not match!');
    register({ username, email, password });
  };

  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1><FaUser /> Register</h1>
        <ToastContainer />
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' value={username} name='username' onChange={onChange} />
          </div>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input type='email' id='email' value={email} name='email' onChange={onChange} />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' value={password} name='password' onChange={onChange} />
          </div>
          <div>
            <label htmlFor='passwordConfirm'>Confirm Password</label>
            <input type='password' id='passwordConfirm' value={password2} name='password2' onChange={onChange} />
          </div>
          <input type='submit' value='Register' className='btn' />
        </form>
        <p>Already have an account? <Link href='/account/login'>Login</Link></p>
      </div>
    </Layout>
  )
};

export default Register;