import Link from 'next/link';
import styles from './page.module.css';

export default function Rodape() {
    return (
        <div className="containerGlobal">
            <footer className={styles.footer}>
                <div className={styles.conteudo}>
                    Desenvolvido por <Link href="/usuarios/sobreNos">Danikawari</Link>
                </div>
            </footer>
        </div>
    );
}