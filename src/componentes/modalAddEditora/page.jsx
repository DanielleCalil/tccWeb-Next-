import { useState } from 'react'; // Importar o useState
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import styles from './page.module.css'; // Estilos CSS
import ModalConfirmar from '@/componentes/modalConfirmar/page'; // Certifique-se de que o nome do componente está correto

const ModalAddEditora = ({ show, onClose }) => {
    const [novaEditora, setNovaEditora] = useState({
        "edt_nome": "",
        "edt_cod": "",
    });

    const router = useRouter();

    if (!show) return null;

    const handleConfirm = async () => {
        if (novaEditora.edt_nome.trim() === "") {
            alert("O nome da editora é obrigatório.");
            return;
        }

        try {
            const response = await api.post('/editoras', {
                edt_nome: novaEditora.edt_nome,
            });

            if (response.status === 200) {
                alert("Editora adicionada com sucesso!")
                setTimeout(() => {
                    onClose(); // Fecha o modal após 2 segundos
                }, 2000);
            } else {
                alert("Erro ao adicionar a editora. Tente novamente.");
            }
        } catch (error) {
            alert("Erro ao conectar ao servidor. Tente novamente."); // Mensagem de erro
            console.error("Erro ao conectar ao servidor:", error);
        }
    };

    const handleInputChange = (e) => {
        setNovaEditora({ ...novaEditora, edt_nome: e.target.value });
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
                                value={novaEditora.edt_nome}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button
                                type="button"
                                onClick={handleConfirm}
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
        </>
    );
};

export default ModalAddEditora;
