"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward, IoCaretBack, IoCaretForward } from "react-icons/io5";
import api from "@/services/api";

import styles from "./page.module.css";

export default function ModalEdtGenero({ show, onClose }) {
    if (!show) return null;
    const router = useRouter();

    const [edtGenero, setEdtGenero] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [generoSelecionado, setGeneroSelecionado] = useState(null);

    const handleAddGenero = async (gen_cod) => {
        try {
            const response = await api.post(`/livros_generos`, { gen_cod });
            if (response.data.sucesso) {
                alert('Gênero adicionado com sucesso!');
                setGeneros(generos.filter(g => g.gen_cod !== gen_cod)); // Remove o curso da lista de disponíveis
                setEdtGenero({
                    ...edtGenero,
                    generos: [...edtGenero.generos, generos.find(g => g.gen_cod === gen_cod)]
                });
            }
        } catch (error) {
            console.error("Error ao adicionar gênero:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao adicionar gênero. Tente novamente.');
        }
    };

    const handleRemoveGenero = async (gen_cod) => {
        try {
            const response = await api.delete(`/livros_generos/${gen_cod}`);
            if (response.data.sucesso) {
                alert('Gênero removido com sucesso!');
                setEdtGenero({
                    ...edtGenero,
                    generos: edtGenero.generos.filter(g => g.gen_cod !== gen_cod) // Remove o curso da lista de selecionados
                });
            }
        } catch (error) {
            console.error("Error ao remover gênero:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao remover gênero. Tente novamente.');
        }
    };

    const handleClick = (gen_cod) => {
        setGeneroSelecionado(gen_cod);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEdtGenero(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        listaGeneros();
    }, []);

    async function listaGeneros() {
        try {
            const response = await api.post('/generos');
            console.log("Resposta da API:", response.data);
            setGeneros(response.data.dados);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    const handleSelect = (gen) => {
        // Adiciona o gênero selecionado ao estado
        if (!edtGenero.some(selected => selected.gen_cod === gen.gen_cod)) {
            setEdtGenero((prev) => [...prev, gen]);
        }
    };

    const handleRemove = (genCod) => {
        // Remove o gênero da lista de selecionados
        setEdtGenero((prev) => prev.filter(gen => gen.gen_cod !== genCod));
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

                                    {edtGenero.length > 0 ? (
                                        edtGenero.map((gen) => (
                                            <li
                                                key={gen.gen_cod}
                                                onClick={() => handleClick(gen.gen_cod)}
                                                className={generoSelecionado === gen.gen_cod ? styles.selected : ''}>
                                                {gen.gen_nome}
                                            </li>
                                        ))
                                    ) : (
                                        <p>Não há gêneros registrados.</p>
                                    )}
                                </ul>
                            </div>
                            <div className={styles.buttons}>
                                <button className={styles.cursosButton}
                                    onClick={() => generoSelecionado && handleAddGenero(generoSelecionado)}>
                                    <IoChevronBack size={20} color="#FFF" />
                                </button>
                                <button className={styles.cursosButton}
                                    onClick={() => generoSelecionado && handleRemoveGenero(generoSelecionado)}>
                                    <IoChevronForward size={20} color="#FFF" />
                                </button>
                            </div>
                            <div className={styles.inputCursos}>
                                <label className={styles.textInput}>Selecione o gênero:</label>
                                <ul className={styles.opcaoCursos}>
                                    {generos.length > 0 ? (
                                        generos.map((gen) => (
                                            <li
                                                key={gen.gen_cod}
                                                onClick={() => handleClick(gen.gen_cod)}
                                                className={generoSelecionado === gen.gen_cod ? styles.selected : ''}>
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
