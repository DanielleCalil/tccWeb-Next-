"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

import styles from "./page.module.css"; // Estilos CSS

const ModalAddAutor = ({ show, onClose }) => {
    const [novoAutor, setNovoAutor] = useState({
        "aut_nome": "",
        "aut_cod": "",
    }); // Estado para armazenar o nome do autor

    const router = useRouter();

    if (!show) return null;

    // Função para enviar o autor ao backend
    const handleConfirm = async () => {
        if (novoAutor.aut_nome.trim() === "") {
            alert("O nome do autor é obrigatório.");
            return; // Não deixa adicionar autor sem nome
        }

        try {
            // Faz a requisição para adicionar o autor ao banco
            const response = await api.post('/autores', {
                aut_nome: novoAutor.aut_nome,
            });

            if (response.status === 200) {
                alert("Autor adicionado com sucesso!")
                setTimeout(() => {
                    onClose(); // Fecha o modal após 2 segundos
                }, 2000);
            } else {
                alert("Erro ao adicionar o autor. Tente novamente.");
            }
        } catch (error) {
            alert("Erro ao conectar ao servidor. Tente novamente."); // Mensagem de erro
            console.error("Erro ao conectar ao servidor:", error);
        }
    };

    // Função para atualizar o nome do autor
    const handleInputChange = (e) => {
        setNovoAutor({ ...novoAutor, aut_nome: e.target.value });
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
                                value={novoAutor.aut_nome} // Vínculo do estado ao input
                                onChange={handleInputChange} // Atualiza o estado conforme o usuário digita
                            />
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button
                                type="button"
                                onClick={handleConfirm} // Chama a função para adicionar o autor diretamente
                                className={styles.modalButtonAdd}
                            >
                                Adicionar
                            </button>
                            <button
                                type="button"
                                onClick={onClose} // Fechar o modal principal
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

export default ModalAddAutor;
