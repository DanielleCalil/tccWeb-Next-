import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';

export default function ReservarLivro() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Reservar livro</h1>
                <div className={styles.container}>
                    <div className={styles.editar}>
                        <Link href="/perfil/">
                            <button className={styles.reservButton}>Finalizar reserva</button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
