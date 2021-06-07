import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Search.module.css';

const Search = () => {
  const [term, setTerm] = useState('');
  const { push } = useRouter();

  const onSubmit = e => {
    e.preventDefault();
    push(`/events/search?term=${term}`);
    setTerm('');
  };

  return (
    <div className={styles.search}>
      <form noValidate onSubmit={onSubmit}>
        <input type='text' value={term} onChange={e => setTerm(e.target.value)} placeholder='Search Events' />
      </form>
    </div>
  )
}

export default Search;