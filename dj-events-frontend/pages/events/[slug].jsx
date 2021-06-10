import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from "@/config/index";
import { useRouter } from 'next/router';

import Layout from "@/layout/Layout";
import { ToastContainer, toast } from 'react-toastify';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import 'react-toastify/dist/ReactToastify.css';

import styles from '@/styles/Event.module.css';

const SlugPage = ({ id, date, time, name, image, performers, description, venue, address }) => {

  const { push } = useRouter();

  const deleteEvent = async (e) => {
    if(confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if(!res.ok) return toast.error(data.message);
      push('/events');
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            <a href='#' className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>
  
          <span>
            {new Date(date).toLocaleDateString('en-US')} at {time}
          </span>
          <h1>{name}</h1>
          <ToastContainer />
          {image && (
            <div className={styles.image}>
              <Image src={image.formats.medium.url} width={960} height={600} />
            </div>
          )}
  
          <h3>Performers:</h3>
          <p>{performers}</p>
          <h3>Description:</h3>
          <p>{description}</p>
          <h3>Venue: {venue}</h3>
          <p>{address}</p>
  
          <Link href='/events'>
            <a className={styles.back}>{'<'} Go Back</a>
          </Link>
        </div>
    </Layout>
  )
}

export default SlugPage;

// export const getServerSideProps = async ({ query: { slug }}) => {
//   const evt = await (await fetch(`${API_URL}/api/events/${slug}`)).json();

//   return {
//     props: { ...evt }
//   }
// };

export const getStaticPaths = async () => {
  const events = await (await fetch(`${API_URL}/events`)).json();
  const paths = events.map(evt => ({ params: { slug: evt.slug } }));

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const evt = await (await fetch(`${API_URL}/events?slug=${slug}`)).json();

  return {
    props: { ...evt[0] },
    revalidate: 1
  }
};