import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { parseCookie } from 'utils';
import { API_URL } from '@/config/index';

import Layout from "@/layout/Layout";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css';

const Add = ({ token }) => {
  const [state, setState] = useState({ name: '', performers: '', venue: '', address: '', date: '', time: '', description: '' });

  const { name, performers, venue, address, date, time, description } = state;
  const { push } = useRouter();

  const onChange = ({ target: { name, value }}) => setState({ ...state, [name]: value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(state).some(el => el === '');
    if(isEmpty) return toast.error('Please fill all the fields!');

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    });

    if(!res.ok) return toast.error('Something went wrong!');

    const evt = await res.json();
    push(`/events/${evt.slug}`);
  };

  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={onSubmit} className={styles.form} noValidate>
        <div className={styles.grid}>
            <div>
              <label htmlFor='name'>Event Name</label>
              <input type='text' name='name' id='name' value={name} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='performers'>Performers</label>
              <input type='text' name='performers' id='performers' value={performers} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='venue'>Venue</label>
              <input type='text' name='venue' id='venue' value={venue} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input type='text' name='address' id='address' value={address} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='date'>Date</label>
              <input type='date' name='date' id='date' value={date} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='time'>Time</label>
              <input type='text' name='time' id='time' value={time} onChange={onChange} />
            </div>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea type='text' name='description' id='description' value={description} onChange={onChange} />
        </div>
        <input type='submit' value='Add Event' className='btn' />
      </form>
    </Layout>
  )
}

export default Add;

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookie(req);

  return {
    props: { token }
  }
}