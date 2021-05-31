import { useRouter } from 'next/router';

import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Showcase from 'components/home/Showcase';

import styles from '@/styles/Layout.module.css';

const Layout = ({ title, description, keywords, children }) => {
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      { pathname === '/' && <Showcase />}
      <div className={styles.container}>
        { children }
      </div>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the laters DJ and other musical events',
  keywords: 'music, dj, edm, events'
};

export default Layout;