"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import api from '@/services/api';

import FileInput from '@/componentes/FileInput/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page';
import ModalAddAutor from '@/componentes/modalAddAutor/page';
import ModalAddEditora from '@/componentes/modalAddEditora/page';
import ModalAddGenero from '@/componentes/modalAddGenero/page';
import ModaisLiv_ from '../../componentes/modaisLiv_/page';
import capaLivro from '@/../../public/imagens_telas/imgLivroNovo.jpg';

export default function AddLivroNovo({ codLiv }) {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const router = useRouter();

    // const [capaImage, setCapaImage] = useState('/imagens_telas/imgLivroNovo.jpg');
    const [autor, setAutor] = useState([]);
    const [editora, setEditora] = useState([]);
    const [genero, setGenero] = useState([]);
    const [img, setImg] = useState('');

    const [livro, setLivro] = useState({
        "liv_cod": '',
        "liv_pha_cod": '',
        "liv_categ_cod": '',
        "liv_nome": '',
        "liv_desc": '',
        "edt_nome": '',
        "edt_cod": '',
        "liv_foto_capa": '',
        "aut_nome": '',
        "aut_cod": '',
        "disponivel": '',
        "Generos": '',
        "gen_cod": '',
        "gen_nome": '',
        // img: imgUp,
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

    useEffect(() => {
        listaAutores();
        listaEditoras();
        listaGeneros();
    }, []);

    async function listaAutores() {
        try {
            const response = await api.get('/autores');
            setAutor(response.data.dados);
            // console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    const handleAddAutor = () => {
        event.preventDefault();
        openModalAutor(); // Abre o modal
    };

    async function listaEditoras() {
        try {
            const response = await api.get('/editoras');
            setEditora(response.data.dados);
            // console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    async function listaGeneros() {
        try {
            const response = await api.get('/generos');
            setGenero(response.data.dados);
            // console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    const upload = async () => {
        try {
            const formdata = new FormData();
            formdata.append('img', img);
            console.log(img);
            
            const res = await api.post('/upload_livro', formdata);
            setImg(res.data.dados);
            return res.data.dados;
        } catch (err) {
            alert(`Erro no upload, tente novamente. ${"\n"} ${err}${err.mensagem}`);
        }
    };

    async function handleSubmitImagem() {
        // event.preventDefault();
        let imgUrl = "";
        if (img) imgUrl = await upload();
        console.log('imagem');
        
        console.log(imgUrl);        
        await handleSubmit(imgUrl);
        openModaisLiv();
    }

    useEffect(() => {
        if (!codLiv) return;

        handleCarregaLivro();
    }, [codLiv]);

    const handleCarregaLivro = async () => {
        const dadosApi = { liv_cod: codLiv };

        try {
            const response = await api.post('/livros', dadosApi);
            if (response.data.sucesso) {
                const livroApi = response.data.dados[0];
                setLivro(livroApi);
            } else {
                alert(response.data.mensagem);
            }
        } catch (error) {
            alert(error.response ? error.response.data.mensagem : 'Erro no front-end');
        }
    };

    // validação
    const [valida, setValida] = useState({
        nome: {
            validado: valDefault,
            mensagem: []
        },
        aut_cod: {
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
        liv_pha_cod: {
            validado: valDefault,
            mensagem: []
        },
        liv_categ_cod: {
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
        },
        resumo: {
            validado: valDefault,
            mensagem: []
        },
        foto: {
            validado: valDefault,
            mensagem: []
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivro(prev => ({ ...prev, [name]: value }));
    }

    // function validaFoto() {
    //     let objTemp = {
    //         validado: valSucesso,
    //         mensagem: []
    //     };

    //     if (!livro.usu_foto) {
    //         objTemp.validado = valErro;
    //         objTemp.mensagem.push("A foto do livro é obrigatória");
    //     }

    //     setValida((prevState) => ({
    //         ...prevState,
    //         foto: objTemp,
    //     }));

    //     const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
    //     return testeResult;
    // }

    function validaSelectAutor() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livro.aut_cod) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Por favor, selecione o nome do autor.');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            aut_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaSelectEditora() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livro.edt_cod) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Por favor, selecione o nome da editora.');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            edt_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaSelectGenero() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (!livro.gen_cod) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Por favor, selecione o gênero.');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            gen_cod: objTemp // atualiza apenas o campo 'nome'
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

    function validapha() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (livro.liv_pha_cod === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O pha do livro é obrigatório');
        } else if (livro.liv_pha_cod.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o pha do livro');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            liv_pha_cod: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validacateg() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (livro.liv_categ_cod === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A categ do livro é obrigatório');
        } else if (livro.liv_categ_cod.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira a categ do livro');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            liv_categ_cod: objTemp // atualiza apenas o campo 'nome'
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

    const [showModaisLiv, setShowModaisLiv] = useState(false);
    const openModaisLiv = () => setShowModaisLiv(true);
    const closeModaisLiv = () => setShowModaisLiv(false);
    const handleLiv = () => {
        setShowModaisLiv(false);
        router.push('../biblioteca');
    };
    async function handleSubmit(imgUrl) {
        let itensValidados = 0;
    
        // Simulações de validação (descomente conforme necessário)
        // itensValidados += validaQuant();
        // itensValidados += validaNome();
        // itensValidados += validaSelectAutor();
        // itensValidados += validaSelectEditora();
        // itensValidados += validaSelectGenero();
        // itensValidados += validapha();
        // itensValidados += validacateg();
        // itensValidados += validaResumo();
        // itensValidados += validaFoto();
    
        // Preparar os dados para envio
        const dados = {
            liv_pha_cod: livro.liv_pha_cod,
            liv_categ_cod: livro.liv_categ_cod,
            liv_nome: livro.liv_nome,
            liv_desc: livro.liv_desc,
            edt_cod: livro.edt_cod,
            liv_ativo: 1,
            liv_foto_capa: imgUrl,
        };
    
        if (itensValidados === 0) {
            try {
                // Enviar dados para o backend
                const response = await api.post('/liv_cadastrar', dados);
    
                if (response.data.sucesso) {
                    const livroCod = response.data.dados.liv_cod; // Extrai o código do livro retornado
    
                    // Atualiza o estado com o código do livro
                    setLivro((prev) => ({ ...prev, liv_cod: livroCod }));
    
                    // Exibe mensagem ao usuário
                    alert(`Livro salvo com sucesso! Código do livro: ${livroCod}`);
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
                <form id="form" className={styles.container}>
                    <div className={styles.inputTotal}>
                        <div className={styles.inputImgContainer}>
                            <div className={styles.imgBook}>

                                {/* <div className={valida.foto.validado + ' ' + styles.valFoto} id="valFoto"> */}
                                <p className={styles.textInput}>Capa:</p>
                                <div className={styles.imagePreview}>
                                    <img
                                        src={capaLivro}
                                        for="perfil"
                                    />
                                    {/* <IoCheckmarkCircleOutline className={styles.sucesso} />
                                        <IoAlertCircleOutline className={styles.erro} /> */}
                                </div>
                                {/* <FileInput onFileSelect={handleFileSelect} onChange={handleFileChange} /> */}
                                <div>
                                    <input
                                        type="file"
                                        id="perfil"
                                        name="livro"
                                        className={styles.customFileUpload}
                                        onChange={v => setImg(v.target.files[0])}
                                    />
                                    {/* <label htmlFor="fileInput" className={styles.customFileUpload}>Escolha o arquivo</label> */}
                                </div>
                                {/* {
                                        valida.foto.mensagem.map(mens => <small key={mens} id="foto" className={styles.small}>{mens}</small>)
                                    }
                                </div> */}
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            {/* <div>
                                <p className={styles.textInput}>Código do livro:</p>
                                <div className={styles.divInput}>
                                    <input
                                        type="number"
                                        name='liv_cod'
                                        value={livro.liv_cod}
                                        className={styles.inputQuant}
                                        disabled
                                    />
                                </div>
                            </div> */}

                            <div className={valida.liv_pha_cod.validado + ' ' + styles.valpha} id="valpha">
                                <label className={styles.textInput}>Códido do pha:</label>
                                <div className={styles.divInput}>
                                    <input
                                        id="pha"
                                        name="liv_pha_cod"
                                        value={livro.liv_pha_cod}
                                        className={styles.inputQuant}
                                        onChange={handleChange}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.liv_pha_cod.mensagem.map(mens => <small key={mens} id="pha" className={styles.small}>{mens}</small>)
                                }
                            </div>

                            <div className={valida.liv_categ_cod.validado + ' ' + styles.valResumo} id="valcateg">
                                <label className={styles.textInput}>Código da categoria do livro:</label>
                                <div className={styles.divInput}>
                                    <input
                                        id="categ"
                                        name="liv_categ_cod"
                                        value={livro.liv_categ_cod}
                                        className={styles.inputQuant}
                                        onChange={handleChange}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.liv_categ_cod.mensagem.map(mens => <small key={mens} id="categ" className={styles.small}>{mens}</small>)
                                }
                            </div>

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

                            <div className={valida.aut_cod.validado + ' ' + styles.valSelectAut} id="valSelectAut">
                                <label className={styles.textInput}>Autor:</label>
                                <div className={styles.divInput}>
                                    <select id="aut_cod" name="aut_cod" defaultValue={livro.aut_cod} onChange={handleChange} className={styles.inputField}>
                                        <option value="0" disabled style={{ color: '#ccc' }}>Selecione autor(a)</option>
                                        {
                                            autor.map(aut => (
                                                <option key={aut.aut_cod} value={aut.aut_cod}>{`${aut.aut_cod} - ${aut.aut_nome}`}</option>
                                            ))
                                        }
                                    </select>
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.aut_cod.mensagem.map(mens => (
                                        <small key={mens} id="autores" className={styles.small}>{mens}</small>
                                    ))
                                }
                            </div>

                            <div className={valida.edt_cod.validado + ' ' + styles.valSelectEdt} id="valSelectEdt">
                                <label className={styles.textInput}>Editora:</label>
                                <div className={styles.divInput}>
                                    <select id="edt_cod" name="edt_cod" defaultValue={livro.edt_cod} onChange={handleChange} className={styles.inputField}>
                                        <option value="0" disabled style={{ color: '#CCC' }}>Selecione editora</option>
                                        {
                                            editora.map(edt => (
                                                <option key={edt.edt_cod} value={edt.edt_cod}>{`${edt.edt_cod} - ${edt.edt_nome}`}</option>
                                            ))
                                        }
                                    </select>
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.edt_cod.mensagem.map(mens => (
                                        <small key={mens} id="editoras" className={styles.small}>{mens}</small>
                                    ))
                                }
                            </div>

                            <div className={valida.gen_cod.validado + ' ' + styles.valSelectGen} id="valSelectGen">
                                <label className={styles.textInput}>Gênero:</label>
                                <div className={styles.divInput}>
                                    <select id="gen_cod" name="gen_cod" defaultValue={livro.gen_cod} onChange={handleChange} className={styles.inputField}>
                                        <option value="0" disabled style={{ color: '#CCC' }}>Selecione o gênero</option>
                                        {
                                            genero.map(gen => (
                                                <option key={gen.gen_cod} value={gen.gen_cod}>{`${gen.gen_cod} - ${gen.gen_nome}`}</option>
                                            ))
                                        }
                                    </select>
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.gen_cod.mensagem.map(mens => (
                                        <small key={mens} id="generos" className={styles.small}>{mens}</small>
                                    ))
                                }
                            </div>

                            <div className={valida.resumo.validado + ' ' + styles.valResumo} id="valResumo">
                                <label className={styles.textInput}>Resumo:</label>
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
                                    onClick={handleAddAutor}
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
                            type="button"
                            onClick={() => handleSubmitImagem()}
                            className={styles.addButtonPrinc}
                        >
                            Adicionar
                        </button>
                    </div>
                    <ModaisLiv_
                        show={showModaisLiv}
                        onClose={closeModaisLiv}
                        onConfirm={handleLiv}
                    />
                    <ModalConfirmar
                        show={showModalConfirm}
                        onClose={closeModalConfirm}
                        onConfirm={handleConfirm}
                    />
                </form>
            </div >
        </main >
    );
}
