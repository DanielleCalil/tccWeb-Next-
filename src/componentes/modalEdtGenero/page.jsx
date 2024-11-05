"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import api from "@/services/api";

import styles from "./page.module.css";

export default function ModalEdtGenero({ show, onClose }) {
    if (!show) return null;
    const router = useRouter();

    const [edtGenero, setEdtGenero] = useState({
        "gen_cod": '',
        "gen_nome": '',
    });

    const [generos, setGeneros] = useState([]);

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

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.conteudo} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>

                        <div className={styles.listaCursos}>
                            <div className={styles.inputCursos}>
                                <label className={styles.textInput}>Selecione o gênero:</label>
                                <ul
                                    id="gen_cod"
                                    name="gen_cod"
                                    value={edtGenero.gen_cod}
                                    // onChange={handleChange}
                                    className={styles.opcaoCursos}
                                >

                                    {/* <option value="" disabled>
                                            {cursos.length > 0 ? "Selecione um curso" : "Nenhum curso disponível"}
                                        </option> */}

                                    {generos.length > 0 ? (
                                        generos.map((gen) => (
                                            <li key={gen.gen_cod} value={gen.gen_cod}>
                                                {gen.gen_nome}
                                            </li>
                                        ))
                                    ) : (
                                        <p>Não há gêneros registrados.</p>
                                    )}
                                </ul>
                            </div>

                            <div className={styles.buttons}>
                                <button className={styles.cursosButton}>
                                    +
                                </button>
                                <button className={styles.cursosButton}>
                                    -
                                </button>
                            </div>

                            <div className={styles.inputCursos}>
                                <label className={styles.textInput}>Gêneros já selecionados:</label>
                                <ul
                                    id="gen_cod"
                                    name="gen_cod"
                                    value={edtGenero.gen_cod}
                                    onChange={handleChange}
                                    className={styles.opcaoCursos}
                                >

                                    {/* <option value="" disabled>
                                                {cursos.length > 0 ? "Selecione um curso" : "Nenhum curso disponível"}
                                            </option> */}

                                    {edtGenero.generos.length > 0 ? (
                                        edtGenero.generos.map((gen) => (
                                            <li key={gen.gen_cod} value={gen.gen_cod}>
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
                </div>
            </div>
        </div>
    );
};
