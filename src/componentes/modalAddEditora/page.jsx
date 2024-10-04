import { useState } from 'react'; // Importar o useState
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import styles from './page.module.css'; // Estilos CSS
import ModalConfirmar from '@/componentes/modalConfirmar/page'; // Certifique-se de que o nome do componente está correto

const ModalAddEditora = ({ show, onClose }) => {
    const [editora, setEditora] = useState('');
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const router = useRouter();

    if (!show) return null;

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = async () => {
       try {
        const response = await api.post('/editoras', {
           edt_nome: editora
        });

        if (response.status) {
            setShowModalConfirm(false);
            router.push('/gerenciarLivroBiblioteca');
        } else {
            console.error('Erro ao adicionar a editora');
        }
       } catch (error) {
        console.error('Erro ao conectar ao servidor:', error)
       }
    };

    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.conteudo}>
                        <div className={styles.inputGroup}>
                            <p className={styles.textInput}>Editora:</p>
                            <input
                                type="text"
                                className={styles.inputField}
                                value={editora.edt_nome}
                                onChange={(e) => setEditora(e.target.value)}
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

export default ModalAddEditora;
