import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

import Layout from "@/layout/Layout";

import styles from '@/styles/404.module.css';

const NotFoundPage = () => (
  <Layout title='Page not found'>
    <div className={styles.error}>
      <h1><FaExclamationTriangle /> 404</h1>
      <h2>Sorry, there is nothing here</h2>
      <Link href='/'>Go Back Home</Link>
    </div>
  </Layout>
)

export default NotFoundPage;