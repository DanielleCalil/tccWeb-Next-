import { useState } from 'react'; // Importar o useState
import Link from 'next/link';
import styles from './page.module.css'; // Estilos CSS
import ModalConfirmar from '@/componentes/modalConfirmar/page'; // Certifique-se de que o nome do componente está correto

const ModalAddGenero = ({ show, onClose }) => {
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal

    if (!show) return null;

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        onClose(); // Chama a função para fechar o modal principal
    };

    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.conteudo}>
                        <div className={styles.inputGroup}>
                            <p className={styles.textInput}>Gênero:</p>
                            <input
                                type="text"
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button onClick={openModal} className={styles.modalButtonAdd}>
                                Adicionar
                            </button>
                            <button onClick={closeModal} className={styles.modalButtonCanc}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <ModalConfirmar 
                    show={showModal} 
                    onClose={() => setShowModal(false)} 
                />
            )}
        </>
    );
};

export default ModalAddGenero;
