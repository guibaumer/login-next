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
  const { setUsername, login, isLoggedIn, setUserId } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(false);
    } else {
      findSession();
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
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

      setUsername(user.username);
      setUserId(user.user_id)
      login();

      setLoading(false);
    }
  }

  const [isClosed, setIsClosed] = useState(true);
  const [windowWidth, setWindowWidth] = useState<null | number>(null);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  const handleClick = () => {
    setIsClosed(!isClosed);
  }

  useEffect(() => {
    if (windowWidth && windowWidth > 550) setIsClosed(true);
  }, [windowWidth]);

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
        (isClosed && windowWidth && windowWidth > 550 || !isClosed && windowWidth && windowWidth < 550) && (
          <div className={`${styles.header_div} ${!isClosed ? 'open' : ''}`}>
              {!isClosed && <img onClick={handleClick} className={styles.close_icon} src='delete.png' alt='Ícone de fechar menu'/>}
              {!loading && isLoggedIn && (
                <>
                  <LogoutButton />
                  <Link className={styles.link} href='/edit'>Config</Link>
                </>
              )}
              {!loading && !isLoggedIn && (
                <>
                  <Link className={styles.link} href="/register">Cadastrar</Link>
                  <Link className={styles.link} href="/login">Logar</Link>
                </>
              )}
              <PulseLoader loading={loading} size={10} color='#fff' />
              <Link className={styles.link} href="/something">Verificar</Link>
          </div>
        )
      }

    </header>
  );
}
