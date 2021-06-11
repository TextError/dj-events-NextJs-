import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';
import { parseCookie } from '../../utils/index';

import Event from '@/components/dashboard/Event';

import Layout from '@/layout/Layout';
import styles from '@/styles/Dashboard.module.css'

const Dashboard = ({ events, token }) => {

  const { reload } = useRouter();

  const onDelete = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`},
      })
      const { message } = await res.json();

      if (!res.ok) return toast.error(message);
      reload();
    }
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
  
        {events.map((evt) => (
          <Event key={evt.id} {...evt} onDelete={onDelete} />
        ))}
      </div>
    </Layout>
  );
}

export default Dashboard;

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookie(req);

  const events = await (await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })).json();

  return {
    props: { events }
  }
}