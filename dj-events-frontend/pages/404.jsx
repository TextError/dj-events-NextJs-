import Link from 'next/link';

import Layout from "../layout/Layout";

import styles from '404.Module.css';

const NotFoundPage = () => (
  <Layout title='Page not found'>
    <div className={styles.error}>
      <h1>404</h1>
      <h2>Sorry, there is nothing here</h2>
      <Link href='/'>Go Back Home</Link>
    </div>
  </Layout>
)

export default NotFoundPage;