import Layout from "@/layout/Layout";
import Link from 'next/link';
import { API_URL } from "@/config/index";
import EventItem from "components/home/EventItem";

const Home = ({ events }) => (
  <Layout>
    <h1>Upcoming Events</h1>
    {!events && <h2>No events to show.</h2>}
    {events && events.map((evt, i) => <EventItem key={i} evt={evt} />)}

    {events && <Link href='/events'><a className='btn-secondary'>View all events</a></Link>}
  </Layout>
);

export default Home;

export const getStaticProps = async () => {
  const events = await (await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)).json();

  return {
    props: { events },
    revalidate: 1
  }
};