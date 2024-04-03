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

    // handleResize();

    window.addEventListener('resize', handleResize);

    handleResize();

    // Return the cleanup function
    return () => {
      // Remove the event listener
      window.removeEventListener('resize', handleResize);
    };


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



  ///////////////////////////////////////////////
  const [isClosed, setIsClosed] = useState(true);
  const [windowWidth, setWindowWidth] = useState<null | number>(null);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  const handleClick = () => {
    setIsClosed(!isClosed);
    console.log(document.querySelector('.header_div_hidden'))
  }

  useEffect(() => {
    if (windowWidth && windowWidth > 550) setIsClosed(true);
  }, [windowWidth]);

  // window.addEventListener('resize', handleResize);





  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1 className={styles.h1}>{SITE_NAME}</h1>
      </Link>


      {
        (windowWidth && windowWidth <= 550) && (
          <div className='' onClick={handleClick}>
            <img className={styles.svg} src="menu-svgrepo-com.svg" alt="Ícone de menu" />
          </div>
        )
      }

      {
        // (isClosed && windowWidth && windowWidth > 550) && (
        (isClosed && windowWidth && windowWidth > 550 || !isClosed && windowWidth && windowWidth < 550) && (
          <div className={`${styles.header_div} ${!isClosed ? 'open' : ''}`}>
            {!loading && isLoggedIn && <LogoutButton />}
            {!loading && !isLoggedIn && (
              <>
                <Link className={styles.link} href="/register">Cadastrar</Link>
                <Link className={styles.link} href="/login">Logar</Link>
              </>
            )}

            <PulseLoader loading={loading} size={10} color='#fff' />
            <Link className={styles.link} href="/something">Something</Link>
          </div>
        )
      }


      {/* <div className={styles.header_div}>
        {!loading && isLoggedIn && <LogoutButton />}
        {!loading && !isLoggedIn && (
          <>
          <Link className={styles.link} href="/register">Cadastrar</Link>
          <Link className={styles.link} href="/login">Logar</Link>
          </>
        )}

        <PulseLoader loading={loading} size={10} color='#fff' />
        <Link className={styles.link} href="/something">Something</Link>
      </div> */}

    </header>
  );
}
