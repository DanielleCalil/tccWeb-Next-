"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import styles from './page.module.css'; // Estilos CSS
import ModalConfirmar from '@/componentes/modalConfirmar/page'; // Certifique-se de que o nome do componente está correto

const ModalAddAutor = ({ show, onClose }) => {
    const [autor, setAutor] = useState(''); // Estado para armazenar o nome do autor
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const router = useRouter();

    if (!show) return null;

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    // Função para enviar o autor ao backend
    const handleConfirm = async () => {
        try {
            // Faz a requisição para adicionar o autor ao banco
            const response = await api.post('/autores', {
                aut_nome: autor
            });

            if (response.status) {
                // Se o envio for bem-sucedido, fecha o modal e redireciona
                setShowModalConfirm(false);
                router.push('/gerenciarLivroBiblioteca'); // Redireciona para a biblioteca
            } else {
                console.error('Erro ao adicionar o autor');
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
                            <p className={styles.textInput}>Autor(a):</p>
                            <input
                                type="text"
                                className={styles.inputField}
                                value={autor.aut_nome} // Vínculo do estado ao input
                                onChange={(e) => setAutor(e.target.value)} // Atualiza o estado conforme o usuário digita
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
                    onConfirm={handleConfirm} // Chama a função para adicionar o autor
                />
            )}
        </>
    );
};

export default ModalAddAutor;
