"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import api from '@/services/api';

import FileInput from '@/componentes/FileInput/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page';
import ModalAddAutor from '@/componentes/modalAddAutor/page';
import ModalAddEditora from '@/componentes/modalAddEditora/page';
import ModalAddGenero from '@/componentes/modalAddGenero/page';

export default function AddLivroNovo() {
    const [capaImage, setCapaImage] = useState('/imagens_telas/imgLivroNovo.jpg');
    const router = useRouter();

    const [livro, setLivro] = useState({
        "liv_cod": '',
        "liv_pha_cod": '',
        "liv_categ_cod": '',
        "liv_nome": '',
        "liv_desc": '',
        "edt_nome": '',
        "liv_foto_capa": '',
        "aut_nome": '',
        "disponivel": '',
        "generos": '',
    });

    const valDefault = styles.formControl;
    const valSucesso = styles.formControl + ' ' + styles.success;
    const valErro = styles.formControl + ' ' + styles.error;

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);
    const handleConfirm = () => {
        setShowModalConfirm(false);
        router.push('../biblioteca');
    };

    const [showModalAutor, setShowModalAutor] = useState(false);
    const openModalAutor = () => setShowModalAutor(true);
    const closeModalAutor = () => setShowModalAutor(false);
    const handleAutor = () => {
        setShowModalAutor(false);
        router.push('../gerenciarLivroExistente');
    };

    const [showModalEditora, setShowModalEditora] = useState(false);
    const openModalEditora = () => setShowModalEditora(true);
    const closeModalEditora = () => setShowModalEditora(false);
    const handleEditora = () => {
        setShowModalEditora(false);
        router.push('../gerenciarLivroExistente');
    };

    const [showModalGenero, setShowModalGenero] = useState(false);
    const openModalGenero = () => setShowModalGenero(true);
    const closeModalGenero = () => setShowModalGenero(false);
    const handleGenero = () => {
        setShowModalGenero(false);
        router.push('../gerenciarLivroExistente');
    };

    const handleFileSelect = (imageUrl) => {
        setCapaImage(imageUrl);
    };

    const [selectedAutor, setSelectedAutor] = useState('');
    const [selectedEditora, setSelectedEditora] = useState('');
    const [selectedGenero, setSelectedGenero] = useState('');

    const [autores, setAutores] = useState([]);
    const [editoras, setEditoras] = useState([]);
    const [generos, setGeneros] = useState([]);

    const handleChangeAutor = (event) => {
        setSelectedAutor(event.target.value);
    };

    const handleChangeEditora = (event) => {
        setSelectedEditora(event.target.value);
    };

    const handleChangeGenero = (event) => {
        setSelectedGenero(event.target.value);
    };


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const autoresResponse = await api.fetch('/autores'); // Substitua pela URL da sua API
                const editorasResponse = await api.fetch('/editoras'); // Substitua pela URL da sua API
                const generosResponse = await api.fetch('/generos'); // Substitua pela URL da sua API

                const autoresData = await autoresResponse.json();
                const editorasData = await editorasResponse.json();
                const generosData = await generosResponse.json();

                setAutores(autoresData);
                setEditoras(editorasData);
                setGeneros(generosData);
            } catch (error) {
                console.error('Erro ao buscar opções:', error);
            }
        };

        fetchOptions();
    }, []);

    // validação
    const [valida, setValida] = useState({
        nome: {
            validado: valDefault,
            mensagem: []
        },
        autor: {
            validado: valDefault,
            mensagem: []
        },
        editora: {
            validado: valDefault,
            mensagem: []
        },
        genero: {
            validado: valDefault,
            mensagem: []
        },
        resumo: {
            validado: valDefault,
            mensagem: []
        },
        capa: {
            validado: valDefault,
            mensagem: []
        },
        quant: {
            validado: valDefault,
            mensagem: []
        }
    });

    function validaQuant() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (livro.disponivel === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A quantidade de livros é obrigatória');
        } else if (livro.disponivel.length <= 0) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A quantidade de livros deve ser maior que 0');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            quant: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaNome() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (livro.liv_nome === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O nome do livro é obrigatório');
        } else if (livro.liv_nome.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o nome do livro');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            nome: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaAutor() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (livro.aut_nome === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O nome do autor é obrigatório');
        } else if (livro.aut_nome.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Selecione o nome do autor');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            autor: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaEditora() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (livro.edt_nome === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O nome da editora é obrigatório');
        } else if (livro.edt_nome.length < 4) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Selecione o nome da editora');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            editora: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaGenero() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (livro.gen_nome === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O gênero do livro é obrigatório');
        } else if (livro.gen_nome.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Selecione o gênero do livro');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            genero: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaResumo() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (livro.liv_desc === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O resumo do livro é obrigatório');
        } else if (livro.liv_desc.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o resumo do livro');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            resumo: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let itensValidados = 0;

        // Validar campos
        itensValidados += validaQuant();
        itensValidados += validaNome();
        itensValidados += validaAutor();
        itensValidados += validaEditora();
        itensValidados += validaGenero();
        itensValidados += validaResumo();

        // Verificar se todos os campos estão validados
        if (itensValidados === 6) {
            try {
                let confirmaCad;
                const response = await api.post('/liv_cadastrar', livro);
                confirmaCad = response.data.sucesso;
                if (confirmaCad) {
                    router.push('/biblioteca');
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

    const handleChange = (e) => {
        setLivro(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.addLivroNovo}>Adicionar livro novo</h1>
                <form id="form" className={styles.container} onSubmit={handleSubmit}>
                    <div className={styles.inputTotal}>
                        <div className={styles.inputImgContainer}>
                            <div className={styles.imgBook}>
                                <p className={styles.textInput}>Capa:</p>
                                <div className={styles.imagePreview}>
                                    <Image
                                        src={capaImage}
                                        alt="Capa do livro"
                                        width={150}
                                        height={200}
                                    />
                                </div>
                                <FileInput onFileSelect={handleFileSelect} />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>

                            <div className={valida.quant.validado + ' ' + styles.valQuant} id="valQuant">
                                <label className={styles.textInput}>Quantidade:</label>
                                <div className={styles.divInput}>
                                    <input
                                        type="number"
                                        name="disponivel"
                                        value={livro.disponivel}
                                        className={styles.inputQuant}
                                        onChange={handleChange}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.quant.mensagem.map(mens => <small key={mens} id="quant" className={styles.small}>{mens}</small>)
                                }
                            </div>

                            <div className={valida.nome.validado + ' ' + styles.valNome} id="valNome">
                                <label className={styles.textInput}>Nome:</label>
                                <div className={styles.divInput}>
                                    <input
                                        type="text"
                                        name="liv_nome"
                                        value={livro.liv_nome}
                                        className={styles.inputField}
                                        onChange={handleChange}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.nome.mensagem.map(mens => <small key={mens} id="nome" className={styles.small}>{mens}</small>)
                                }
                            </div>

                            <div className={valida.autor.validado + ' ' + styles.valAutor} id="valAutor">
                                <label className={styles.textInput}>Autor:</label>
                                <div className={styles.divInput}>
                                    <select id="autores" name="autor" defaultValue={livro.selectedAutor} onChange={handleChangeAutor} className={styles.inputField}>
                                        <option value="0" disabled style={{ color: '#ccc' }}>Selecione...</option>
                                        {
                                            autores.map(aut => (
                                                <option key={aut.aut_nome} value={aut.aut_nome}>{aut.aut_nome}</option>
                                            ))
                                        }
                                    </select>
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.autor.mensagem.map(mens => (
                                        <small key={mens} id="autores" className={styles.small}>{mens}</small>
                                    ))
                                }
                            </div>

                            <div className={valida.editora.validado + ' ' + styles.valEditora} id="valEditora">
                                <label className={styles.textInput}>Editora:</label>
                                <div className={styles.divInput}>
                                    <select id="editoras" name="editora" defaultValue={livro.selectedEditora} onChange={handleChangeEditora} className={styles.inputField}>
                                        <option value="0" disabled style={{ color: '#ccc' }}>Selecione...</option>
                                        {
                                            editoras.map(edt => (
                                                <option key={edt.edt_nome} value={edt.edt_nome}>{edt.edt_nome}</option>
                                            ))
                                        }
                                    </select>
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.editora.mensagem.map(mens => (
                                        <small key={mens} id="editoras" className={styles.small}>{mens}</small>
                                    ))
                                }
                            </div>

                            <div className={valida.genero.validado + ' ' + styles.valGenero} id="valGenero">
                                <label className={styles.textInput}>Gênero:</label>
                                <div className={styles.divInput}>
                                    <select id="generos" name="genero" defaultValue={livro.selectedGenero} onChange={handleChangeGenero} className={styles.inputField}>
                                        <option value="0" disabled style={{ color: '#ccc' }}>Selecione...</option>
                                        {
                                            generos.map(gen => (
                                                <option key={gen.gen_nome} value={gen.gen_nome}>{gen.gen_nome}</option>
                                            ))
                                        }
                                    </select>
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.genero.mensagem.map(mens => (
                                        <small key={mens} id="generos" className={styles.small}>{mens}</small>
                                    ))
                                }
                            </div>

                            <div className={valida.resumo.validado + ' ' + styles.valResumo} id="valResumo">
                                <p className={styles.textInput}>Resumo:</p>
                                <div className={styles.divInput}>
                                    <textarea
                                        id="resumo"
                                        name="liv_desc"
                                        value={livro.liv_desc}
                                        className={styles.inputResumo}
                                        onChange={handleChange}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.resumo.mensagem.map(mens => <small key={mens} id="resumo" className={styles.small}>{mens}</small>)
                                }
                            </div>

                            <div className={styles.tresModais}>
                                {/* Modal para adicionar autor */}
                                <button
                                    type="button"
                                    onClick={openModalAutor}
                                    className={styles.addButton}
                                >
                                    Adicionar Autor(a)
                                </button>
                                <ModalAddAutor
                                    show={showModalAutor}
                                    onClose={closeModalAutor}
                                    onConfirm={handleAutor}
                                />

                                {/* Modal para adicionar editora */}
                                <button
                                    type="button"
                                    onClick={openModalEditora}
                                    className={styles.addButton}
                                >
                                    Adicionar Editora
                                </button>
                                <ModalAddEditora
                                    show={showModalEditora}
                                    onClose={closeModalEditora}
                                    onConfirm={handleEditora}
                                />

                                {/* Modal para adicionar gênero */}
                                <button
                                    type="button"
                                    onClick={openModalGenero}
                                    className={styles.addButton}
                                >
                                    Adicionar Gênero
                                </button>
                                <ModalAddGenero
                                    show={showModalGenero}
                                    onClose={closeModalGenero}
                                    onConfirm={handleGenero}
                                />
                            </div>
                            <p className={styles.obs}>Obs.: se já tiver adicionado o que deseja em alguns dos botões acima é só selecionar o que deseja no campo selecionável desejável.</p>
                        </div>
                    </div>

                    <div className={styles.editar}>
                        <button
                            type="submit"
                            className={styles.addButtonPrinc}
                        >
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
            <ModalConfirmar
                show={showModalConfirm}
                onClose={closeModalConfirm}
                onConfirm={handleConfirm}
            />
        </main>
    );
}
