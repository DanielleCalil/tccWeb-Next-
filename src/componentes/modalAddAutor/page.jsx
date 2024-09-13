
import Link from 'next/link';
import styles from './page.module.css'; // Assume you will write your CSS styles in Modal.module.css

const ModalAddAutor = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.buttonsContainer}>
                    <div className={styles.inputGroup}>
                        <p className={styles.textInput}>Autor(a):</p>
                        <input
                            type="text"
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.editar}>
                        <Link href="/">
                            <button className={styles.modalButtonAdd}>Adicionar</button>
                        </Link>
                        <Link href="/">
                            <button className={styles.modalButtonCanc}>Cancelar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAddAutor;
