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
    const [cursoSelecionado, setCursoSelecionado] = useState(null);

    const handleAddCurso = (cur_cod) => {
        const adiciona = cursos.find(cur => cur.cur_cod === cur_cod);
        if (adiciona) {
            setCursos(cursos.filter(cur => cur.cur_cod !== cur_cod));
            setPerfilEdt({
                ...perfilEdt,
                cursos: [...perfilEdt.cursos, adiciona]
            });
        }
    };

    const handleRemoveCurso = (cur_cod) => {
        const remove = perfilEdt.cursos.find(cur => cur.cur_cod === cur_cod);
        if (remove) {
            setPerfilEdt({
                ...perfilEdt,
                cursos: perfilEdt.cursos.filter(cur => cur.cur_cod !== cur_cod)
            });
            setCursos([...cursos, remove]);
        }
    };

    const handleClick = (cur_cod) => {
        setCursoSelecionado(cur_cod);
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
            setGeneros(response.data.dados);
            // console.log('generos');            
            // console.log(response.data);
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

                                    {generos.length > 0 ? (
                                        generos.map((gen) => (
                                            <li
                                                key={gen.gen_cod}
                                                onClick={() => handleClick(cur.cur_cod)}
                                                className={cursoSelecionado === cur.cur_cod ? styles.selected : ''}>
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
                                    onClick={() => cursoSelecionado && handleAddCurso(cursoSelecionado)}>
                                    <IoChevronBack size={20} color="#FFF" />
                                </button>
                                <button className={styles.cursosButton}
                                    onClick={() => cursoSelecionado && handleRemoveCurso(cursoSelecionado)}>
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
                                                onClick={() => handleClick(cur.cur_cod)}
                                                className={cursoSelecionado === cur.cur_cod ? styles.selected : ''}>
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
                </form>
            </div>
        </div>
    );
};
