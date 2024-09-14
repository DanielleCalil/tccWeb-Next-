"use client";
import { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import FileInput from '@/componentes/FileInput/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page';
import ModalAddAutor from '@/componentes/modalAddAutor/page'; // Importa o modal
import ModalAddEditora from '@/componentes/modalAddEditora/page';
import ModalAddGenero from '@/componentes/modalAddGenero/page';

export default function AddLivroNovo() {
    const [capaImage, setCapaImage] = useState('/imagens_telas/imgLivroNovo.jpg');
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalAutor, setShowModalAutor] = useState(false);
    const [showModalEditora, setShowModalEditora] = useState(false);
    const [showModalGenero, setShowModalGenero] = useState(false);

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => {
        setShowModalConfirm(false);
        onClose();
    };

    const handleFileSelect = (imageUrl) => {
        setCapaImage(imageUrl);
    };

    const openModalAutor = () => setShowModalAutor(true);
    const closeModalAutor = () => setShowModalAutor(false);

    const openModalEditora = () => setShowModalEditora(true);
    const closeModalEditora = () => setShowModalEditora(false);

    const openModalGenero = () => setShowModalGenero(true);
    const closeModalGenero = () => setShowModalGenero(false);

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
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Quantidade:</p>
                                <input
                                    type="number"
                                    className={styles.inputQuant}
                                />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Nome:</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Autor:</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Editora:</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Gênero:</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                />
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
                                <button onClick={openModalAutor} className={styles.addButton}>
                                    Adicionar Autor(a)
                                </button>
                                <ModalAddAutor show={showModalAutor} onClose={closeModalAutor} />

                                {/* Modal para adicionar editora */}
                                <button onClick={openModalEditora} className={styles.addButton}>
                                    Adicionar Editora
                                </button>
                                <ModalAddEditora show={showModalEditora} onClose={closeModalEditora} />

                                {/* Modal para adicionar gênero */}
                                <button onClick={openModalGenero} className={styles.addButton}>
                                    Adicionar Gênero
                                </button>
                                <ModalAddGenero show={showModalGenero} onClose={closeModalGenero} />

                            </div>
                            <p className={styles.obs}>Obs.: se já tiver adicionado o que deseja em alguns dos botões acima é só selecionar o que deseja no campo selecionável desejável.</p>
                        </div>
                    </div>

                    <div className={styles.editar}>
                        <button onClick={openModalConfirm} className={styles.addButtonPrinc}>
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
            <ModalConfirmar show={showModalConfirm} onClose={closeModalConfirm} />
        </main>
    );
}
