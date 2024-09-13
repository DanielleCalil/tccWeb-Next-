"use client";
import { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import FileInput from '@/componentes/FileInput/page';
import ModalAddAutor from '@/componentes/modalAddAutor/page'; // Importa o modal
import ModalAddEditora from '@/componentes/modalAddEditora/page';
import ModalAddGenero from '@/componentes/modalAddGenero/page';

export default function AddLivroNovo() {
    const [capaImage, setCapaImage] = useState('/imagens_telas/imgLivroNovo.jpg');
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal

    const handleFileSelect = (imageUrl) => {
        setCapaImage(imageUrl);
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

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
                                <button onClick={openModal} className={styles.addButton}>
                                    Adicionar Autor(a)
                                </button>
                                {/* Modal para adicionar autor */}
                                <ModalAddAutor show={showModal} onClose={closeModal} />
                                
                                <button onClick={openModal} className={styles.addButton}>
                                    <button className={styles.addButton}>Adicionar Editora</button>
                                </button>
                                <ModalAddEditora show={showModal} onClose={closeModal} />

                                <Link href="/">
                                    <button className={styles.addButton}>Adicionar Gênero</button>
                                </Link>
                            </div>
                            <p className={styles.obs}>Obs.: se já tiver adicionado o que deseja em alguns dos botões acima é só selecionar o que deseja no campo selecionável desejável.</p>
                        </div>
                    </div>

                    <div className={styles.editar}>
                        <Link href="/biblioteca/">
                            <button className={styles.addButtonPrinc}>Adicionar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
