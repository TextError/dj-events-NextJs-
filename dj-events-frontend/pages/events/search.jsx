import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from "@/config/index";
import Layout from "@/layout/Layout";

import EventItem from "components/home/EventItem";

const SearchPage = ({ events }) => {
  const { query: { term }} = useRouter();
  return  (
    <Layout title='Search Results'>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for: {term}</h1>
      {!events && <h2>No events to show.</h2>}
  
      {events && events.map((evt, i) => <EventItem key={i} evt={evt} />)}
    </Layout>
  );
};

export const getServerSideProps = async ({ query: {term} }) => {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term }
      ]
    }
  })

  // const events = await (await fetch(`${API_URL}/events?name_contains=${term}`)).json();
  const events = await (await fetch(`${API_URL}/events?${query}`)).json();

  return {
    props: { events }
  }
};

export default SearchPage;