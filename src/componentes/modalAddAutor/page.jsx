"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import api from "@/services/api";

import styles from "./page.module.css";

export default function ModalAddAutor({ show, onClose }) {
    if (!show) return null;
    const router = useRouter();

    const [novoAutor, setNovoAutor] = useState({
        "aut_cod": 0,
        "aut_nome": "",
    });

    const valDefault = styles.formControl;
    const valSucesso = styles.formControl + ' ' + styles.success;
    const valErro = styles.formControl + ' ' + styles.error;

    // validação
    const [valida, setValida] = useState({
        autNome: {
            validado: valDefault,
            mensagem: []
        },
    });

    const handleChange = (e) => {
        setNovoAutor(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    function validaAutNome() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (novoAutor.aut_nome === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O nome do autor(a) é obrigatório');
        } else if (novoAutor.aut_nome.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o nome completo do autor(a)');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            autNome: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let itensValidados = 0;

        itensValidados += validaAutNome();

        if (itensValidados === 1) {
            try {
                const response = await api.post('/autores', novoAutor);
                if (response.data.sucesso) {
                    alert("Autor adicionado com sucesso!");
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
    }
    console.log(novoAutor);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.conteudo} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>

                        <div className={valida.autNome.validado + ' ' + styles.valAutNome} id="valAutNome">
                            <p className={styles.textInput}>Autor(a):</p>
                            <div className={styles.divInput}>
                                <input
                                    type="text"
                                    name="aut_nome"
                                    className={styles.inputField}
                                    onChange={handleChange}
                                />
                                <IoCheckmarkCircleOutline className={styles.sucesso} />
                                <IoAlertCircleOutline className={styles.erro} />
                            </div>
                            {
                                valida.autNome.mensagem.map(mens => <small key={mens} id="autNome" className={styles.small}>{mens}</small>)
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
