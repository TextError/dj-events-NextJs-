import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link'
import { API_URL } from "@/config/index";
import Image from 'next/image'
import Layout from "@/layout/Layout";

import styles from '@/styles/Event.module.css';

const SlugPage = ({ id, date, time, name, image, performers, description, venue, address }) => {

  const deleteEvent = (e) => {
    console.log('delete')
  }

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
            {date} at {time}
          </span>
          <h1>{name}</h1>
          {image && (
            <div className={styles.image}>
              <Image src={image} width={960} height={600} />
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
  const events = await (await fetch(`${API_URL}/api/events`)).json();
  const paths = events.map(evt => ({ params: { slug: evt.slug } }));

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const evt = await (await fetch(`${API_URL}/api/events/${slug}`)).json();

  return {
    props: { ...evt },
    revalidate: 1
  }
};