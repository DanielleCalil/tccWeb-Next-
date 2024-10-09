import { useState } from 'react'; // Importar o useState
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import styles from './page.module.css'; // Estilos CSS
import ModalConfirmar from '@/componentes/modalConfirmar/page'; // Certifique-se de que o nome do componente está correto

const ModalAddGenero = ({ show, onClose }) => {
    const [novoGenero, setNovoGenero] = useState({
        "gen_nome": '',
        "gen_cod": '',
    });

    const router = useRouter();

    if (!show) return null;

    const handleConfirm = async () => {
        if (novoGenero.gen_nome.trim() === "") {
            alert("O nome do gênero é obrigatório.");
            return; // Não deixa adicionar autor sem nome
        }

        try {
            // Faz a requisição para adicionar o autor ao banco
            const response = await api.post('/generos', {
                gen_nome: novoAutor.gen_nome,
            });

            if (response.status === 200) {
                alert("Gênero adicionado com sucesso!")
                setTimeout(() => {
                    onClose(); // Fecha o modal após 2 segundos
                }, 2000);
            } else {
                alert("Erro ao adicionar o gênero. Tente novamente.");
            }
        } catch (error) {
            alert("Erro ao conectar ao servidor. Tente novamente."); // Mensagem de erro
            console.error("Erro ao conectar ao servidor:", error);
        }
    };

    const handleInputChange = (e) => {
        setNovoGenero({ ...novoGenero, gen_nome: e.target.value });
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
                                value={novoGenero.gen_nome}
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

export default ModalAddGenero;
