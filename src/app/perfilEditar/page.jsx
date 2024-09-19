"use client"
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useState } from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import FileInput from "@/componentes/FileInput/page";
import ModalConfirmar from '@/componentes/modalConfirmar/page';

export default function PerfilEditar() {
    const [profileImage, setProfileImage] = useState('/Icons TCC/perfil.jpg'); // Imagem padrão

    const handleFileSelect = (imageUrl) => {
        setProfileImage(imageUrl);
    };

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const router = useRouter();

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = () => {
        setShowModalConfirm(false); // Fecha o modal
        router.push('../perfil');
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
                    <Link href="/usuarios/esqueceuSenha1">Esqueceu a senha?</Link>
                </div>
                <div className={styles.editar}>
                    <button
                        type="submit"
                        onClick={openModalConfirm}
                        className={styles.saveButton}
                    >
                        Salvar
                    </button>
                </div>
            </div>
            <ModalConfirmar
                show={showModalConfirm}
                onClose={closeModalConfirm}
                onConfirm={handleConfirm}
            />
        </main>
    );
}
