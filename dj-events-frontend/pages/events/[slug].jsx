import { API_URL } from "@/config/index";
import Layout from "@/layout/Layout";

const SlugPage = ({  }) => (
  <Layout>
    SlugPage
  </Layout>
)

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