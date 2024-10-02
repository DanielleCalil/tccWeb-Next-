import { useState } from 'react'; // Importar o useState
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './page.module.css'; // Estilos CSS
import ModalConfirmar from '@/componentes/modalConfirmar/page'; // Certifique-se de que o nome do componente está correto

const ModalAddGenero = ({ show, onClose }) => {
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const router = useRouter();

    if (!show) return null;

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = async () => {
        try {
            const response = await fetch('/editoras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: autor }),
            });

            if (response.ok) {
                setShowModalConfirm(false);
                router.push('gerenciarLivroBiblioteca');

            } else {
                console.error('Erro ao adicionar');
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error);
        }
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
                            <button
                                type="submit"
                                onClick={openModalConfirm}
                                className={styles.modalButtonAdd}
                            >
                                Adicionar
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
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

export default ModalAddGenero;
