import Link from 'next/link';
import styles from './index.module.css';

export default function Rodape() {
    return (
        <footer className={styles.footer}>
            <div className={styles.conteudo}>
                Desenvolvido por <Link href="/sobreNos/">Danikawari</Link>
            </div>
        </footer>
    );
}