import styles from './styles.module.css';
import { SITE_NAME } from '@/config/app-config';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>{SITE_NAME}</h1>
    </header>
  );
}
