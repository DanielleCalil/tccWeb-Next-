"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import api from '@/services/api';

import styles from './page.module.css';

export default function ModalAddEditora({ show, onClose }) {
    if (!show) return null;
    const router = useRouter();

    const [novaEditora, setNovaEditora] = useState({
        "edt_cod": 0,
        "edt_nome": "",
    });

    const valDefault = styles.formControl;
    const valSucesso = styles.formControl + ' ' + styles.success;
    const valErro = styles.formControl + ' ' + styles.error;

    // validação
    const [valida, setValida] = useState({
        edtNome: {
            validado: valDefault,
            mensagem: []
        },
    });

    const handleChange = (e) => {
        setNovaEditora(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    function validaEdtNome() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (novaEditora.edt_nome === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O nome da editora é obrigatório');
        }
        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            edtNome: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let itensValidados = 0;

        itensValidados += validaEdtNome();

        if (itensValidados === 1) {
            try {
                const response = await api.post('/editoras', novaEditora);
                if (response.data.sucesso) {
                    alert("Editora adicionada com sucesso!")
                    setTimeout(() => {
                        onClose(); // Fecha o modal após 2 segundos
                    }, 2000);
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.mensagem + '\n' + error.response.data.dados);
                } else {
                    alert('Erro no front-end' + '\n' + error);
                }
            }
        }
    };
    console.log(novaEditora);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.conteudo} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>

                        <div className={valida.edtNome.validado + ' ' + styles.valEdtNome} id="valEdtNome">
                            <p className={styles.textInput}>Editora:</p>
                            <div className={styles.divInput}>
                                <input
                                    type="text"
                                    name="edt_nome"
                                    className={styles.inputField}
                                    onChange={handleChange}
                                />
                                <IoCheckmarkCircleOutline className={styles.sucesso} />
                                <IoAlertCircleOutline className={styles.erro} />
                            </div>
                            {
                                valida.edtNome.mensagem.map(mens => <small key={mens} id="edtNome" className={styles.small}>{mens}</small>)
                            }
                        </div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button
                            type="submit"
                            className={styles.modalButtonAdd}
                            onClick={handleSubmit}
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
    );
};
