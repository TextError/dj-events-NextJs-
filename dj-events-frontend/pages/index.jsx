import Layout from "@/layout/Layout";
import { API_URL } from "@/config/index";
import EventItem from "components/home/EventItem";

const Home = ({ events }) => (
  <Layout>
    <h1>Upcoming Events</h1>
    {events.length === 0 && <h2>No svents to show.</h2>}
    {events.map((evt, i) => <EventItem key={i} evt={evt} />)}
  </Layout>
);

export default Home;

export const getStaticProps = async () => {
  const events = await (await fetch(`${API_URL}/api/events`)).json();

  return {
    props: { events },
    revalidate: 1
  }
};