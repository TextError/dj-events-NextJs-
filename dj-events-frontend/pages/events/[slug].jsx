import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from "@/config/index";

import Layout from "@/layout/Layout";

import 'react-toastify/dist/ReactToastify.css';

import styles from '@/styles/Event.module.css';
import Map from '@/components/events/Map';

const SlugPage = ({ date, time, name, image, performers, description, venue, address }) => (
  <Layout>
    <div className={styles.event}>
      <span>
        {new Date(date).toLocaleDateString('en-US')} at {time}
      </span>
      <h1>{name}</h1>
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

      <Map address={address} />

      <Link href='/events'>
        <a className={styles.back}>{'<'} Go Back</a>
      </Link>
    </div>
  </Layout>
)

export default SlugPage;

export const getServerSideProps = async ({ query: { slug }}) => {
  const evt = await (await fetch(`${API_URL}/events?slug=${slug}`)).json();

  return {
    props: { ...evt }
  }
};

// export const getStaticPaths = async () => {
//   const events = await (await fetch(`${API_URL}/events`)).json();
//   const paths = events.map(evt => ({ params: { slug: evt.slug } }));

//   return {
//     paths,
//     fallback: true
//   }
// }

// export const getStaticProps = async ({ params: { slug }}) => {
//   const evt = await (await fetch(`${API_URL}/events?slug=${slug}`)).json();

//   return {
//     props: { ...evt[0] },
//     revalidate: 1
//   }
// };