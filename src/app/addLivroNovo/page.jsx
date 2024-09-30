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
        liv_cod: '',
        liv_pha_cod: '',
        liv_categ_cod: '',
        liv_nome: '',
        liv_desc: '',
        edt_nome: '',
        liv_foto_capa: '',
        aut_nome: '',
        liv_desc: '',
        disponivel: '',
        generos: '',
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
                const autoresResponse = await fetch('/autores'); // Substitua pela URL da sua API
                const editorasResponse = await fetch('/editoras'); // Substitua pela URL da sua API
                const generosResponse = await fetch('/generos'); // Substitua pela URL da sua API

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
        quantdade: {
            validado: valDefault,
            mensagem: []
        }
    });

    const handleChange = (e) => {
        setLivro(prev => ({ ...prev, [e.target.name]: e.target.value }));
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

    function validaQuant() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (livro.disponivel === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A quantidade de livros é obrigatória');
        } else if (livro.disponivel.length > 1) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A quantidade de livros deve ser maior que 1');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            quant: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let itensValidados = 0;
        itensValidados += validaNome();
        itensValidados += validaAutor();
        itensValidados += validaEditora();
        itensValidados += validaGenero();
        itensValidados += validaResumo();
        itensValidados += validaQuant();
        // itensValidados += validaCapa();

        // salvar quando atingir o número de itens a serem validados
        // alert(itensValidados);
        if (itensValidados === 7) {
            // alert('chama api');            

            try {
                let confirmaCad;
                const response = await api.post('/livros', livro);
                confirmaCad = response.data.sucesso;
                // const idUsu = confirmaCad;
                // alert(idUsu);
                if (confirmaCad) {
                    router.push('/biblioteca')
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


    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.addLivroNovo}>Adicionar livro novo</h1>
                <div className={styles.container}>
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

                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Quantidade:</p>
                                <input
                                    type="number"
                                    className={styles.inputQuant}
                                />
                            </div>

                            <div className={valida.nome.validado + ' ' + styles.valNome} id="valNome">
                                <div className={styles.divInput}>
                                    <p className={styles.textInput}>Nome:</p>
                                    <input
                                        type="text"
                                        name="liv_nome"
                                        className={styles.inputField}
                                        onChange={handleChange}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.nome.mensagem.map(mens => <small key={mens} id="nome" className={styles.small}>{mens}</small>) //exibe as mensagens de erro ou sucesso para o usuário.
                                }
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="autores" className={styles.textInput}>Autor:</label>
                                <select id="autores" value={selectedAutor} onChange={handleChangeAutor} className={styles.inputField}>
                                    <option value="">Selecione...</option>
                                    {autores.map(autor => (
                                        <option key={autor.id} value={autor.id}>{autor.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="editoras" className={styles.textInput}>Editora:</label>
                                <select id="editoras" value={selectedEditora} onChange={handleChangeEditora} className={styles.inputField}>
                                    <option value="">Selecione...</option>
                                    {editoras.map(editora => (
                                        <option key={editora.id} value={editora.id}>{editora.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="generos" className={styles.textInput}>Gênero:</label>
                                <select id="generos" value={selectedGenero} onChange={handleChangeGenero} className={styles.inputField}>
                                    <option value="">Selecione...</option>
                                    {generos.map(genero => (
                                        <option key={genero.id} value={genero.id}>{genero.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Resumo:</p>
                                <textarea
                                    id="resumo"
                                    name="resumo"
                                    className={styles.inputResumo}
                                />
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

                    <button
                        type="submit"
                        onClick={openModalConfirm}
                        className={styles.addButtonPrinc}
                    >
                        Adicionar
                    </button>

                </div>
            </div>
            <ModalConfirmar
                show={showModalConfirm}
                onClose={closeModalConfirm}
                onConfirm={handleConfirm}
            />
        </main>
    );
}
