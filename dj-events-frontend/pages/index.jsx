import Layout from "@/layout/Layout";
import { API_URL } from "@/config/index";

const Home = ({ events }) => (
  <Layout>
    <h1>Upcoming Events</h1>
    {console.log(events)}
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