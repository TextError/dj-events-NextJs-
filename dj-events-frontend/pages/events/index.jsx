import { API_URL } from "@/config/index";
import Layout from "@/layout/Layout";

import EventItem from "components/home/EventItem";

const EventPage = ({ events }) => (
  <Layout title='Add new Event'>
    <h1>Events</h1>
    {!events && <h2>No events to show.</h2>}

    {events && events.map((evt, i) => <EventItem key={i} evt={evt} />)}
  </Layout>
);

export const getStaticProps = async () => {
  const events = await (await fetch(`${API_URL}/events?_sort=date:ASC`)).json();

  return {
    props: { events },
    revalidate: 1
  }
};

export default EventPage;