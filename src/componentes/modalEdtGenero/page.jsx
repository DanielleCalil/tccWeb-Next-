"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward, IoCaretBack, IoCaretForward } from "react-icons/io5";
import api from "@/services/api";

import styles from "./page.module.css";

export default function ModalEdtGenero({ show, onClose, codLiv }) {
    if (!show) return null;
    const router = useRouter();

    const [edtGenero, setEdtGenero] = useState({
        "liv_cod": '',
        "gen_cod": '',
        "gen_nome": '',
        "Generos": '',
        "lge_cod": '',
    });
    const [generos, setGeneros] = useState([]);
    const [generoSelecionadoLivro, setGeneroSelecionadoLivro] = useState(null);
    const [generoSelecionadoEscola, setGeneroSelecionadoEscola] = useState(null);

    const handleClickLivro = (gen_cod) => {
        setGeneroSelecionadoLivro(gen_cod);
    };
    const handleClickEscola = (gen_cod) => {
        setGeneroSelecionadoEscola(gen_cod);
    };

    const handleAddGenero = async (gen_cod) => {
        try {
            const response = await api.post(`/livros_generos`, { liv_cod: codLiv, gen_cod: generoSelecionadoEscola });
            if (response.data.sucesso) {
                alert('Gênero adicionado com sucesso!');
                listaGeneros();
                handleCarregaLivro();
            }
        } catch (error) {
            console.error("Error ao adicionar gênero:", error);
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
            console.error("Error ao remover gênero:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao remover gênero. Tente novamente.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEdtGenero(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        if (codLiv) listaGeneros();
    }, [codLiv]);

    async function listaGeneros() {
        const dados = { liv_cod: codLiv };

        try {
            const response = await api.post('/generos', dados);
            // console.log("Resposta da API:", response.data);
            setGeneros(response.data.dados);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
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
                setEdtGenero(livroApi);
            } else {
                alert(response.data.mensagem);
            }
        } catch (error) {
            alert(error.response ? error.response.data.mensagem : 'Erro no front-end');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        console.log("Gêneros selecionados:", edtGenero);
        onClose(); // Fecha o modal após a submissão
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <form className={styles.conteudo} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>

                        <div className={styles.listaCursos}>

                            <div className={styles.inputCursos}>
                                <label className={styles.textInput}>Gêneros já selecionados:</label>
                                <ul
                                    id="gen_cod"
                                    name="gen_cod"
                                    value={edtGenero.gen_cod}
                                    onChange={handleChange}
                                    className={styles.opcaoCursos}
                                >

                                    {edtGenero.generos && edtGenero.generos.length > 0 ? (
                                        edtGenero.generos.map((gen) => (
                                            <li
                                                key={gen.lge_cod}
                                                value={gen.lge_cod}
                                                onClick={() => handleClickLivro(gen.lge_cod)}
                                                className={generoSelecionadoLivro === gen.lge_cod ? styles.selected : ''}>
                                                {gen.Generos}
                                            </li>
                                        ))
                                    ) : (
                                        <p>Não há gêneros registrados.</p>
                                    )}
                                </ul>
                            </div>
                            <div className={styles.buttons}>
                                <button className={styles.cursosButton}
                                    onClick={() => generoSelecionadoEscola && handleAddGenero(generoSelecionadoLivro)}>
                                    <IoChevronBack size={20} color="#FFF" />
                                </button>
                                <button className={styles.cursosButton}
                                    onClick={() => generoSelecionadoLivro && handleRemoveGenero(generoSelecionadoEscola)}>
                                    <IoChevronForward size={20} color="#FFF" />
                                </button>
                            </div>
                            <div className={styles.inputCursos}>
                                <label className={styles.textInput}>Selecione o gênero:</label>
                                <ul
                                    id="gen_cod"
                                    name="gen_cod"
                                    value={edtGenero.gen_cod}
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
                                                {gen.Generos}
                                            </li>
                                        ))
                                    ) : (
                                        <p>Não há gêneros registrados.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        {/* <button
                            type="submit"
                            className={styles.modalButtonAdd}
                            onClick={handleSubmit}
                        >
                            Adicionar
                        </button> */}
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.modalButtonCanc}
                        >
                            Fechar
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};
