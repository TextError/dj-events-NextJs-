import Head from 'next/head';
import styles from '../styles/Layout.module.css';

const Layout = ({ title, description, keywords, children }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Head>
    <div className={styles.container}>
      { children }
    </div>
  </>
);

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the laters DJ and other musical events',
  keywords: 'music, dj, edm, events'
};

export default Layout;