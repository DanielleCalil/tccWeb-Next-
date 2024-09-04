
import Link from 'next/link';
import styles from './page.module.css';

const ModalInativa = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p className={styles.text}>Tem certeza que deseja inativar este livro?</p>
                <div className={styles.buttonsContainer}>
                    <Link href="/biblioteca">
                        <button className={styles.modalButtonSim}>Sim</button>
                    </Link>
                    <button onClick={onClose} className={styles.modalButtonNao}>Não</button>

                </div>
            </div>
        </div>
    );
};

export default ModalInativa;
