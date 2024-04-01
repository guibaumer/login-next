'use client'

import Link from 'next/link';
import styles from './styles.module.css';
import { API_URL, SITE_NAME } from '@/config/app-config';
import LogoutButton from '../LogoutButton/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

export default function Header() {
  const [loading, setLoading] = useState(true);
  const { setName, login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(false);
    } else {
      findSession();
    }
  }, []);

  async function findSession() {
    const response = await fetch(`${API_URL}/user/session`, {
      credentials: 'include',
    });

    if (!response.ok) {
      return setLoading(false); 
    } else {
      const user = await response.json();
  
      setName(user.username);
      login();
  
      setLoading(false);
    }   
  }

  return (
    <header className={styles.header}>
      <Link href='/'>
      <h1 className={styles.h1}>{SITE_NAME}</h1>
      </Link>

      <div className={styles.header_div}>
        {!loading && isLoggedIn && <LogoutButton />}
        {!loading && !isLoggedIn && (
          <>
          <Link className={styles.link} href="/register">Cadastrar</Link>
          <Link className={styles.link} href="/login">Logar</Link>
          </>
        )}
        
         {/* {(!loading && !isLoggedIn) ? (
          <>
          <Link className={styles.link} href="/register">Cadastrar</Link>
          <Link className={styles.link} href="/login">Logar</Link>
          </>
        ) : <ClipLoader size={25} color='#fff' />} */}

        <PulseLoader loading={loading} size={10} color='#fff' />
        <Link className={styles.link} href="/something">Something</Link>
      </div>

    </header>
  );
}
