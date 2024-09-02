import React from 'react';
import Link from 'next/link';
import styles from './page.module.css'; // Assume you will write your CSS styles in Modal.module.css

const Modal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.buttonsContainer}>
                    <Link href="/addLivroExistente">
                        <button className={styles.modalButton}>Adicionar livro existente</button>
                    </Link>
                    <Link Link href="/addLivroNovo">
                        <button className={styles.modalButton}>Adicionar livro novo</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Modal;
