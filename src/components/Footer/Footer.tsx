import styles from './styles.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.credits}>Site criado por <a className={styles.a} href="https://github.com/guibaumer" target="blank">guibaumer</a>.</p>
        </footer>
    )
}