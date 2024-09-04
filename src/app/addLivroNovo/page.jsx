"use client";
import { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import FileInput from '@/componentes/FileInput/page';

export default function AddLivroNovo() {
    const [capaImage, setCapaImage] = useState('/imagens_telas/imgLivroNovo.jpg');

    const handleFileSelect = (imageUrl) => {
        setCapaImage(imageUrl);
    };

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
                        </div>
                    </div>
                    <div className={styles.editar}>
                        <Link href="/biblioteca/">
                            <button className={styles.addButton}>Adicionar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
