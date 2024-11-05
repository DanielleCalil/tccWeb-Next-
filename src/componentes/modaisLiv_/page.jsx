"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";

import api from "@/services/api";
import styles from "./page.module.css";

export default function ModaisLiv_({ show, onClose }) {
    if (!show) return null;
    const router = useRouter();

    const [livAutores, setLivAutores] = useState({ "aut_cod": 0, "liv_cod": 0 });
    const [livEditora, setLivEditora] = useState({ "edt_cod": 0, "liv_cod": 0 });
    const [livGenero, setLivGenero] = useState({ "gen_cod": 0, "liv_cod": 0 });
    // const [livCod, setLivCod] = useState({ "liv_cod": "" });

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
        livCodAut: {
            validado: valDefault,
            mensagem: []
        },
        edt_cod: {
            validado: valDefault,
            mensagem: []
        },
        livCodEdt: {
            validado: valDefault,
            mensagem: []
        },
        gen_cod: {
            validado: valDefault,
            mensagem: []
        },
        livCodGen: {
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
    // const handleChangeLiv = (e) => {
    //     setLivCod(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // };

    function validaAutCod() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livAutores.aut_cod) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código do autor(a) é obrigatório');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            aut_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaLivCodAut() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livAutores.liv_cod) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código do livro é obrigatório');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            livCodAut: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaEdtCod() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livEditora.edt_cod) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código da editora é obrigatório');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            edt_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaLivCodEdt() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livEditora.liv_cod) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código do livro é obrigatório');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            livCodEdt: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaGenCod() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livGenero.gen_cod) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código do gênero é obrigatório');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            gen_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaLivCodGen() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livGenero.liv_cod) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código do livro é obrigatório');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            livCodGen: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }


    async function handleSubmit(event) {
        event.preventDefault();
        let isValid = false;

        if (currentModal === 1) {
            isValid = validaAutCod() || validaLivCodAut();
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
            isValid = validaEdtCod() || validaLivCodEdt();
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
            isValid = validaGenCod() || validaLivCodGen();
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
                <div className={styles.conteudo} id="form" onSubmit={handleSubmit}>
                    {currentModal === 1 && (
                        <div className={styles.inputGroup}>
                            <div className={valida.aut_cod.validado + ' ' + styles.valAutCod} id="valAutNome">
                                <p className={styles.textInput}>Código autor(a):</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="number"
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

                            <div className={valida.livCodAut.validado + ' ' + styles.valLivCod} id="valAutNome">
                                <p className={styles.textInput}>Código do livro:</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="number"
                                        name="liv_cod"
                                        className={styles.inputField}
                                        onChange={handleChangeAut}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.livCodAut.mensagem.map(mens => <small key={mens} id="livCod" className={styles.small}>{mens}</small>)
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
                                        type="number"
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

                            <div className={valida.livCodEdt.validado + ' ' + styles.valLivCod} id="valAutNome">
                                <p className={styles.textInput}>Código do livro:</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="number"
                                        name="liv_cod"
                                        className={styles.inputField}
                                        onChange={handleChangeEdt}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.livCodEdt.mensagem.map(mens => <small key={mens} id="livCod" className={styles.small}>{mens}</small>)
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
                                        type="number"
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

                            <div className={valida.livCodGen.validado + ' ' + styles.valLivCod} id="valAutNome">
                                <p className={styles.textInput}>Código do livro:</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="number"
                                        name="liv_cod"
                                        className={styles.inputField}
                                        onChange={handleChangeGen}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.livCodGen.mensagem.map(mens => <small key={mens} id="livCod" className={styles.small}>{mens}</small>)
                                }
                            </div>
                        </div>
                    )}

                    <div className={styles.buttonsContainer}>
                        <button type="submit" onClick={handleSubmit} className={styles.modalButtonAdd}>Salvar</button>
                        <button type="button" className={styles.modalButtonCanc} onClick={onClose}>Cancelar</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
