"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";

import api from "@/services/api";
import styles from "./page.module.css";

export default function ModaisLiv_({ show, onClose }) {
    if (!show) return null;
    const router = useRouter();

    const [livAutores, setLivAutores] = useState({ "aut_cod": 0 });
    const [livEditora, setLivEditora] = useState({ "edt_cod": 0 });
    const [livGenero, setLivGenero] = useState({ "gen_cod": 0 });
    const [livCod, setLivCod] = useState({ "liv_cod": 0 });

    // Estado para controlar qual modal está sendo exibido
    const [currentModal, setCurrentModal] = useState(1);

    const valDefault = styles.formControl;
    const valSucesso = styles.formControl + ' ' + styles.success;
    const valErro = styles.formControl + ' ' + styles.error;

    // validação
    const [valida, setValida] = useState({
        aut_cod: {
            validado: valDefault,
            mensagem: []
        },
        liv_cod: {
            validado: valDefault,
            mensagem: []
        },
        edt_cod: {
            validado: valDefault,
            mensagem: []
        },
        gen_cod: {
            validado: valDefault,
            mensagem: []
        },
    });

    const handleChangeAut = (e) => {
        setLivAutores(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleChangeEdt = (e) => {
        setLivEditora(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleChangeGen = (e) => {
        setLivGenero(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleChangeLiv = (e) => {
        setLivCod(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    function validaAutCod() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livAutores.aut_cod === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código do autor(a) é obrigatório');
        } else if (livAutores.aut_cod.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o código do autor(a)');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            aut_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaLivCod() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livCod.liv_cod === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código do livro é obrigatório');
        } else if (livCod.liv_cod.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o código do livro');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            liv_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaEdtCod() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livEditora.edt_cod === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código da editora é obrigatório');
        } else if (livEditora.edt_cod.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o código da editora');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            edt_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaGenCod() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livGenero.gen_cod === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código do autor(a) é obrigatório');
        } else if (livGenero.gen_cod.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o código do autor(a)');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            gen_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }


    async function handleSubmit(event) {
        event.preventDefault();
        let isValid;

        if (currentModal === 1) {
            isValid = validaAutCod() && validaLivCod();
            if (isValid) {
                try {
                    const response = await api.post("/livros_autores", livAutores);
                    if (response.data.sucesso) {
                        alert("livro_autor adicionado com sucesso!");
                        setCurrentModal(2); // Avançar para o segundo modal
                    }
                } catch (error) {
                    alert(
                        error.response
                            ? error.response.data.mensagem + "\n" + error.response.data.dados
                            : "Erro no front-end" + "\n" + error
                    );
                }
            }
        } else if (currentModal === 2) {
            isValid = validaEdtCod() && validaLivCod();
            if (isValid) {
                try {
                    const response = await api.post("/livros_editoras", livEditora);
                    if (response.data.sucesso) {
                        alert("livro_editora adicionado com sucesso!");
                        setCurrentModal(3); // Avançar para o terceiro modal
                    }
                } catch (error) {
                    alert(
                        error.response
                            ? error.response.data.mensagem + "\n" + error.response.data.dados
                            : "Erro no front-end" + "\n" + error
                    );
                }
            }
        } else if (currentModal === 3) {
            isValid = validaGenCod() && validaLivCod();
            if (isValid) {
                try {
                    const response = await api.post("/livros_generos", livGenero);
                    if (response.data.sucesso) {
                        alert("livro_genero adicionado com sucesso!");
                        setTimeout(() => {
                            onClose(); // Fecha o modal após 2 segundos
                        }, 2000);
                    }
                } catch (error) {
                    alert(
                        error.response
                            ? error.response.data.mensagem + "\n" + error.response.data.dados
                            : "Erro no front-end" + "\n" + error
                    );
                }
            }
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.conteudo} onSubmit={handleSubmit}>
                    {currentModal === 1 && (
                        <div className={styles.inputGroup}>
                            <div className={valida.aut_cod.validado + ' ' + styles.valAutCod} id="valAutNome">
                                <p className={styles.textInput}>Código autor(a):</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="text"
                                        name="aut_cod"
                                        className={styles.inputField}
                                        onChange={handleChangeAut}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.aut_cod.mensagem.map(mens => <small key={mens} id="autCod" className={styles.small}>{mens}</small>)
                                }
                            </div>

                            <div className={valida.liv_cod.validado + ' ' + styles.valLivCod} id="valAutNome">
                                <p className={styles.textInput}>Código do livro:</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="text"
                                        name="liv_cod"
                                        className={styles.inputField}
                                        onChange={handleChangeLiv}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.liv_cod.mensagem.map(mens => <small key={mens} id="livCod" className={styles.small}>{mens}</small>)
                                }
                            </div>
                        </div>
                    )}

                    {currentModal === 2 && (
                        <div className={styles.inputGroup}>
                            <div className={valida.edt_cod.validado + ' ' + styles.valEdtCod} id="valAutNome">
                                <p className={styles.textInput}>Código editora:</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="text"
                                        name="edt_cod"
                                        className={styles.inputField}
                                        onChange={handleChangeEdt}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.edt_cod.mensagem.map(mens => <small key={mens} id="edtCod" className={styles.small}>{mens}</small>)
                                }
                            </div>

                            <div className={valida.liv_cod.validado + ' ' + styles.valLivCod} id="valAutNome">
                                <p className={styles.textInput}>Código do livro:</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="text"
                                        name="liv_cod"
                                        className={styles.inputField}
                                        onChange={handleChangeLiv}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.liv_cod.mensagem.map(mens => <small key={mens} id="livCod" className={styles.small}>{mens}</small>)
                                }
                            </div>
                        </div>
                    )}
                    {currentModal === 3 && (
                        <div className={styles.inputGroup}>

                            <div className={valida.gen_cod.validado + ' ' + styles.valGenCod} id="valAutNome">
                                <p className={styles.textInput}>Código gênero:</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="text"
                                        name="gen_cod"
                                        className={styles.inputField}
                                        onChange={handleChangeGen}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.gen_cod.mensagem.map(mens => <small key={mens} id="genCod" className={styles.small}>{mens}</small>)
                                }
                            </div>

                            <div className={valida.liv_cod.validado + ' ' + styles.valLivCod} id="valAutNome">
                                <p className={styles.textInput}>Código do livro:</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="text"
                                        name="liv_cod"
                                        className={styles.inputField}
                                        onChange={handleChangeLiv}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.liv_cod.mensagem.map(mens => <small key={mens} id="livCod" className={styles.small}>{mens}</small>)
                                }
                            </div>
                        </div>
                    )}

                    <div className={styles.botaoContainer}>
                        <button type="submit" className={styles.submitButton}>Salvar</button>
                        <button type="button" className={styles.closeButton} onClick={onClose}>Fechar</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
