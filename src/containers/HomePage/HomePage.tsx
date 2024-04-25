'use client'

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './styles.module.css';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { username } = useAuth();

  return (
    <>
      <Header />
      <h2>HOME</h2>
      {username && <h4 className={styles.h4}>Olá, {username}</h4>}
      <div className={styles.container}>
        <div className={styles.info}>
          Esta aplicação foi criada com Next.js.
          Ela está conectada com uma API criada por mim com Node.js e Express, que por sua vez está
          ligada à um banco de dados criado com PostgreSQL.
          Se trata de um sistema de login que usa sessions para a autenticação. <strong>
            Pelo fato dos serviços que usei para fazer deploy serem gratuitos, pode haver um delay
            de uns 30s na primeira conexão com a api/db.
          </strong>
        </div>
      </div>
      <Footer />
    </>
  );
}
