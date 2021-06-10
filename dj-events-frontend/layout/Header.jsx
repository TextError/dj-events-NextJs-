import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';

import Search from '@/components/layout/Search';

import styles from '@/styles/Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <Link href='/'>DJ Events</ Link>
    </div>
    <Search />
    <nav>
      <ul>
        <li><Link href='/events'>Events</Link></li>
        <li><Link href='/events/add'>Add events</Link></li>
        <li><Link href='/account/login'><a className='btn-secondary btn-icon'><FaSignInAlt />Sign-in</a></Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;