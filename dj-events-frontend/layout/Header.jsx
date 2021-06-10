import { useContext } from 'react';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';

import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Search from '@/components/layout/Search';

import styles from '@/styles/Header.module.css';

const Header = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>DJ Events</ Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li><Link href='/events'>Events</Link></li>
          { user && 
            <>
              <li><Link href='/account/dashboard'>Dashboard</Link></li>
              <li><Link href='/events/add'>Add events</Link></li>
              <li onClick={() => signOut()}><FaSignOutAlt />Sign-out</li>
            </>
          }
          { !user && <li><Link href='/account/login'><a className='btn-secondary btn-icon'><FaSignInAlt />Sign-in</a></Link></li> }
        </ul>
      </nav>
    </header>
  );
}

export default Header;