
import Link from 'next/link';
import styles from './page.module.css'; // Assume you will write your CSS styles in Modal.module.css

const ModalAdd = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.buttonsContainer}>
                    <Link href="/gerenciarLivroExistente">
                        <button className={styles.modalButton}>Gerenciar livro existente</button>
                    </Link>
                    <Link Link href="/addLivroNovo">
                        <button className={styles.modalButton}>Adicionar livro novo</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModalAdd;
