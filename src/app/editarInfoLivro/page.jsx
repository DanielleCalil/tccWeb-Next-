"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import FileInput from '@/componentes/FileInput/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page';
import ModalEdtGenero from '../../componentes/modalEdtGenero/page';
// import { extractFileName } from "../utils/extractFileName";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import api from '@/services/api';

export default function EditarInformacoesLivro({ codLivro, imgUp }) {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };

    const router = useRouter();
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [img, setImg] = useState('');
    const [generos, setGeneros] = useState([]);
    const [generoSelecionadoLivro, setGeneroSelecionadoLivro] = useState(null);
    const [generoSelecionadoEscola, setGeneroSelecionadoEscola] = useState(null);
    console.log(generoSelecionadoLivro);

    const handleClickLivro = (gen_cod) => {
        setGeneroSelecionadoLivro(gen_cod);
    };
    const handleClickEscola = (gen_cod) => {
        setGeneroSelecionadoEscola(gen_cod);
    };

    const handleAddGenero = async (gen_cod) => {
        try {
            const response = await api.post(`/livros_generos`, { liv_cod: codLivro, gen_cod: generoSelecionadoEscola });
            if (response.data.sucesso) {
                alert('Gênero adicionado com sucesso!');
                listaGeneros();
                handleCarregaLivro();
            }
        } catch (error) {
            console.error("Erro ao adicionar gênero:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao adicionar gênero. Tente novamente.');
        }
    };

    const handleRemoveGenero = async (gen_cod) => {
        try {
            const response = await api.delete(`/livros_generos/${generoSelecionadoLivro}`);
            if (response.data.sucesso) {
                alert('Gênero removido com sucesso!');
                listaGeneros();
                handleCarregaLivro();
            }
        } catch (error) {
            console.error("Erro ao remover gênero:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao remover gênero. Tente novamente.');
        }
    };

    const [livro, setLivro] = useState({
        "liv_cod": '',
        "liv_nome": '',
        "disponivel": '',
        "liv_desc": '',
        "aut_nome": '',
        "edt_nome": '',
        "gen_nome": '',
        "liv_foto_capa": '',
        "Generos": '',
        "liv_pha_cod": '',
        "liv_categ_cod": '',
        "edt_cod": '',
        "lge_cod": '',
        "gen_cod": '',
        img: imgUp

        // "liv_pha_cod": "D738p",
        // "liv_categ_cod": "0.810",
        // "liv_nome": "A Garota do Lago 3",
        // "liv_desc": "A Garota do Lago é um thriller que se passa em uma pequena cidade montanhosa chamada Summit Lake, onde a repórter Kelsey Castle investiga o brutal assassinato da estudante de direito Becca Eckersley. Becca, filha de um advogado influente, foi morta em sua casa, deixando a comunidade em choque. Enquanto Kelsey segue as pistas do caso, ela se conecta intimamente com a vítima e descobre segredos sombrios sobre sua vida. A selvageria do crime e os esforços para abafar o caso indicam que pode não ter sido um ataque aleatório. Conforme Kelsey desvenda os segredos de Becca, ela também confronta seu próprio passado obscuro.",
        // "edt_cod": "27",
        // "liv_foto_capa": "a garota do lago.jpg" 
    });

    const [autor, setAutor] = useState([]);
    const [editora, setEditora] = useState([]);
    // const [genero, setGenero] = useState([]);

    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = async () => {
        closeModalConfirm();
        await handleSave();
    };

    useEffect(() => {
        listaAutor();
        listaEditora();
    }, []);

    async function listaAutor() {
        try {
            const response = await api.get('/autores');
            setAutor(response.data.dados);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    async function listaEditora() {
        try {
            const response = await api.get('/editoras');
            setEditora(response.data.dados);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }
    useEffect(() => {
        if (codLivro) listaGeneros();
    }, [codLivro]);

    async function listaGeneros() {
        const dados = { liv_cod: codLivro };

        try {
            const response = await api.post('/Gen_disp', dados);
            setGeneros(response.data.dados);
            console.log(response.data);
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
            const res = await api.post('/upload', formdata);
            setImg(res.data.dados);
            return res.data.dados;
        } catch (err) {
            alert(`Erro no upload, tente novamente. ${"\n"} ${err}${err.mensagem}`);
        }
    };

    async function handleSubmitImagem(event) {
        event.preventDefault();
        let imgUrl = "";
        if (img) imgUrl = await upload();
        await handleCreate(imgUrl);
    }

    useEffect(() => {
        if (!codLivro) return;

        handleCarregaLivro();
    }, [codLivro]);

    const handleCarregaLivro = async () => {
        const dadosApi = { liv_cod: codLivro };

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



    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivro(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const { liv_pha_cod, liv_categ_cod, liv_nome, disponivel, liv_desc, aut_nome, edt_nome } = livro;

        // Verifica se os campos obrigatórios estão preenchidos
        if (!liv_pha_cod || !liv_categ_cod || !liv_nome || !disponivel || !liv_desc || !aut_nome || !edt_nome) {
            alert('Todos os campos devem ser preenchidos');
            return;
        }

        setIsSaving(true); // Inicia o salvamento

        try {
            const response = await api.patch(`/livros/${livro.liv_cod}`, {
                ...livro,
                liv_foto_capa: img || livro.liv_foto_capa // Mantém a imagem original se nenhuma nova foi carregada
            });

            if (response.data.sucesso) {
                alert('Livro atualizado com sucesso!');
                router.push('/biblioteca'); // Redireciona após o sucesso
            }
        } catch (error) {
            console.error("Erro ao salvar informações do livro:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao salvar informações. Tente novamente.');
        } finally {
            setIsSaving(false); // Finaliza o salvamento
        }
    };


    console.log(generos);
    // console.log(livro.Generos);

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Editar informações do livro</h1>
                <div className={styles.container}>
                    {livro.liv_cod ? (
                        <div className={styles.lineSquare}>
                            <div className={styles.inputContainer}>
                                <div className={styles.infoBookReserva}>
                                    <div className={styles.imgBook}>
                                        <div className={styles.imagePreview}>
                                            <img
                                                htmlFor="perfil"
                                                src={livro.liv_foto_capa}
                                                alt="Foto de perfil"
                                                className={styles.imgReserva}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="file"
                                                id="fileinput"
                                                name='perfil'
                                                className={styles.customFile}
                                                onChange={v => setImg(v.target.files[0])}
                                            />
                                            <label htmlFor="fileInput" className={styles.customFileUpload}>Escolha o arquivo</label>
                                        </div>
                                    </div>
                                    <div className={styles.livroInfo}>
                                        <div className={styles.headerLineSquare}>
                                            <div className={styles.title}>
                                                <p className={styles.geral}>Visão geral</p>
                                                <div className={styles.cods}>
                                                    <label className={styles.codsText}>Código PHA do livro:</label>
                                                    <input
                                                        type="text"
                                                        value={livro.liv_pha_cod}
                                                        onChange={(e) => setLivro({ ...livro, liv_pha_cod: e.target.value })}
                                                        className={styles.editInputCods}
                                                        aria-label="pha do livro"
                                                    />
                                                    <label className={styles.codsText}>Código da categoria do livro:</label>
                                                    <input
                                                        type="text"
                                                        value={livro.liv_categ_cod}
                                                        onChange={(e) => setLivro({ ...livro, liv_categ_cod: e.target.value })}
                                                        className={styles.editInputCods}
                                                        aria-label="categ do livro"
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={livro.liv_nome}
                                                    onChange={(e) => setLivro({ ...livro, liv_nome: e.target.value })}
                                                    className={`${styles.editInputTittle} ${styles.editInput}`}
                                                    aria-label="Nome do livro"
                                                />
                                            </div>
                                            <div className={styles.smallLineSquare}>
                                                <div className={styles.quantidade}>
                                                    <span className={styles.disponivel}>Disponíveis</span>
                                                    <input
                                                        type="number"
                                                        value={livro.disponivel}
                                                        onChange={(e) => {
                                                            const value = Number(e.target.value);
                                                            setLivro({ ...livro, disponivel: isNaN(value) ? 0 : value });
                                                        }}
                                                        className={`${styles.editInputQuant} ${styles.editInput}`}
                                                        aria-label="Quantidade disponível"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <textarea
                                            value={livro.liv_desc}
                                            onChange={(e) => setLivro({ ...livro, liv_desc: e.target.value })}
                                            className={styles.inputResumo}
                                            aria-label="Descrição do livro"
                                        />
                                        <div className={styles.infoContainer}>
                                            <div className={styles.infoBox}>
                                                <span className={styles.titleSuperior}>Autor(a)</span>
                                                <Image
                                                    src="/Icons TCC/autor.png"
                                                    alt="Autor"
                                                    width={1080}
                                                    height={980}
                                                    className={styles.imgIcons}
                                                />
                                                <select id="aut_cod" name="aut_cod" value={livro.aut_cod} onChange={handleChange} className={styles.opcao}>
                                                    <option value="0" style={{ color: '#999' }}>Selecione Autor(a)</option>
                                                    {autor.map(aut => (
                                                        <option key={aut.aut_cod} value={aut.aut_cod}>{aut.aut_nome}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={styles.infoBox}>
                                                <span className={styles.titleSuperior}>Editora</span>
                                                <Image
                                                    src="/Icons TCC/editora.png"
                                                    alt="Editora"
                                                    width={1080}
                                                    height={980}
                                                    className={styles.imgIcons}
                                                />
                                                <select id="edt_cod" name="edt_cod" value={livro.edt_cod} onChange={handleChange} className={styles.opcao}>
                                                    <option value="0" style={{ color: '#999' }}>Selecione a Editora</option>
                                                    {editora.map(edt => (
                                                        <option key={edt.edt_cod} value={edt.edt_cod}>{edt.edt_nome}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={styles.infoBox}>
                                                <span className={styles.titleSuperior}>Gênero</span>
                                                <Image
                                                    src="/Icons TCC/genero.png"
                                                    alt="Gênero"
                                                    width={1080}
                                                    height={980}
                                                    className={styles.imgIcons}
                                                />
                                                <div className={styles.infoBox}>

                                                    <div className={styles.listaCursos}>
                                                        <div className={styles.inputCursos}>
                                                            <label className={styles.textInput}>Gêneros já selecionados:</label>
                                                            <ul
                                                                id="gen_cod"
                                                                name="gen_cod"
                                                                value={livro.gen_cod}
                                                                onChange={handleChange}
                                                                className={styles.opcaoCursos}
                                                            >
                                                                
                                                                 {livro.Generos ? (
                                                                    livro.Generos.split(',').map((genero, index) => (
                                                                        <li
                                                                            key={index}
                                                                            value={genero.trim()}
                                                                            onClick={() => handleClickLivro(genero.trim())}
                                                                            className={generoSelecionadoLivro === genero.trim() ? styles.selected : ''}
                                                                        >
                                                                            {genero.trim()}
                                                                        </li>
                                                                    ))
                                                                ) : (
                                                                    <p>Não há gêneros registrados.</p>
                                                                )} 
                                                            </ul>
                                                        </div>

                                                        <div className={styles.buttons}>
                                                            <button className={styles.cursosButton}
                                                                onClick={() => generoSelecionadoEscola && handleAddGenero(generoSelecionadoLivro)}
                                                                disabled={!livro.liv_cod}>
                                                                <IoChevronBack size={20} color="#FFF" />
                                                            </button>
                                                            <button className={styles.cursosButton}
                                                                onClick={() => generoSelecionadoLivro && handleRemoveGenero(generoSelecionadoEscola)}
                                                                disabled={!livro.liv_cod}>
                                                                <IoChevronForward size={20} color="#FFF" />
                                                            </button>
                                                        </div>

                                                        <div className={styles.inputCursos}>
                                                            <label className={styles.textInput}>Selecione o gênero:</label>
                                                            <ul
                                                                id="gen_cod"
                                                                name="gen_cod"
                                                                value={livro.gen_cod}
                                                                onChange={handleChange}
                                                                className={styles.opcaoCursos}
                                                            >
                                                                {generos.length > 0 ? (
                                                                    generos.map((gen) => (
                                                                        <li
                                                                            key={gen.gen_cod}
                                                                            value={gen.gen_cod}
                                                                            onClick={() => handleClickEscola(gen.gen_cod)}
                                                                            className={generoSelecionadoEscola === gen.gen_cod ? styles.selected : ''}>
                                                                            {gen.gen_nome}
                                                                        </li>
                                                                    ))
                                                                ) : (
                                                                    <p>Não há gêneros registrados.</p>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className={styles.editar}>
                                            <button
                                                type="submit"
                                                onClick={() => { handleSubmitImagem(); handleSave(); }}
                                                className={styles.saveButton}
                                            >
                                                {isSaving ? 'Salvando...' : 'Salvar alterações'}
                                            </button>
                                        </div>
                                        <ModalConfirmar
                                            show={showModalConfirm}
                                            onClose={closeModalConfirm}
                                            onConfirm={handleConfirm}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h1>Não há resultados para a requisição</h1>
                    )}
                </div>
            </div>
        </main>
    );
}
