import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './page.module.css'; // Estilos CSS
import ModalConfirmar from '@/componentes/modalConfirmar/page'; // Certifique-se de que o nome do componente está correto

const ModalAddAutor = ({ show, onClose }) => {
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const router = useRouter();

    if (!show) return null;

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = () => {
        setShowModalConfirm(false);
        router.push('/biblioteca');
    };

    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.conteudo}>
                        <div className={styles.inputGroup}>
                            <p className={styles.textInput}>Autor(a):</p>
                            <input
                                type="text"
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button
                                type="submit"
                                onClick={openModalConfirm}
                                className={styles.modalButtonAdd}
                            >
                                Adicionar
                            </button>
                            <button
                                type="button" // Alterar o tipo do botão
                                onClick={onClose} // Fechar o modal principal
                                className={styles.modalButtonCanc}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModalConfirm && (
                <ModalConfirmar
                    show={showModalConfirm}
                    onClose={closeModalConfirm}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
};

export default ModalAddAutor;
