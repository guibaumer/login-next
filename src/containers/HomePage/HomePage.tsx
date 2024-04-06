'use client'

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './styles.module.css';

export default function HomePage() {
  return (
    <>
      <Header />
      <h2>HOME</h2>
      <div className={styles.container}>
        <div className={styles.info}>Esta aplicação foi criada com Next.js.
          Ela está conectada com uma API criada por mim com Node.js, que por sua vez está
          ligada à um banco de dados criado com PostgreSQL.
          Se trata de um sistema de login que usa sessions para a autenticação.
        </div>
      </div>
      <Footer />
    </>
  );
}
