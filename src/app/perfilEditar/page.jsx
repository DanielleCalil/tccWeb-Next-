"use client"
import Image from "next/image";
import { useState } from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import FileInput from "@/componentes/FileInput/page";

export default function PerfilEditar() {
    const [profileImage, setProfileImage] = useState('/Icons TCC/perfil.jpg'); // Imagem padrão

    const handleFileSelect = (imageUrl) => {
        setProfileImage(imageUrl);
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.perfil}>Perfil</h1>
                <div className={styles.parentContainer}>
                    <div className={styles.PIContainer}>
                        <div className={styles.profileContainer}>
                            <div className={styles.imgContainer}>
                                <Image
                                    src={profileImage}
                                    alt="Foto de perfil"
                                    width={512}
                                    height={512}
                                />
                            </div>
                            <FileInput onFileSelect={handleFileSelect} />
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>RM:</p>
                                <input
                                    type="number"
                                    className={`${styles.inputField} ${styles.inputRm}`}
                                    disabled
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Nome social:</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Nome completo:</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    disabled
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>E-mail:</p>
                                <input
                                    type="email"
                                    className={styles.inputField}
                                />
                            </div>
                            <form className={styles.sexoForm}>
                                <legend>Sexo:</legend>
                                <label>
                                    <input
                                        type="radio"
                                        name="opcao"
                                        value="feminino"
                                    />
                                    Feminino
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="opcao"
                                        value="masculino"
                                    />
                                    Masculino
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="opcao"
                                        value="neutro"
                                    />
                                    Neutro
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="opcao"
                                        value="padrao"
                                    />
                                    Padrão
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.redefinir}>
                    <Link href="/esqueceuSenha1/">Esqueceu a senha?</Link>
                </div>
                <div className={styles.editar}>
                    <Link href="/perfil/">
                        <button type="submit" className={styles.saveButton}>Salvar</button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
