"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import api from '@/services/api';

import styles from './page.module.css';
import { on } from 'events';

export default function ModalEsqueceuSenha({ show, onClose }) {
    if (!show) return null;
    const router = useRouter();

    const [esqueceuSenha, setEsqueceuSenha] = useState({
        "usu_email": "",
        "usu_senha": ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (esqueceuSenha.usu_email && esqueceuSenha.usu_senha) {
                const responseSenha = await api.post('/redsenha', {
                    usu_email_rm: esqueceuSenha.usu_email,
                    usu_senha: esqueceuSenha.usu_senha,
                    usu_cod: esqueceuSenha.usu_cod 
                });

                if (responseSenha.data.sucesso) {
                    alert('Senha alterada com sucesso!');
                    onClose();
                    router.push('/login');
                } else {
                    alert('Erro ao alterar a senha:', responseSenha.data.mensagem);
                }
            }
        } catch (error) {
            alert('Erro ao fazer a requisição:', error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <form className={styles.conteudo} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <p className={styles.textInput}>Verifique sua caixa de mensagens.</p>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button
                            type="submit"
                            className={styles.modalButtonAdd}
                        >
                            Ok
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
