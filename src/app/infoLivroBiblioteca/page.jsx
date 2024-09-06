"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { IoPencilSharp } from "react-icons/io5";

export default function InfoLivroBiblioteca() {
    const router = useRouter();

    const handleEdit = () => {
        // Navega para a tela de edição
        router.push('/editarInfoLivro');
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Informações do livro</h1>
                <div className={styles.contButton}>
                    <Link href="/editarInfoLivro">
                        <button className={styles.ButtonEditar} onClick={handleEdit}>
                            <IoPencilSharp className={styles.tpiconEditar} />
                            Editar
                        </button>
                    </Link>
                </div>
                <div className={styles.container}>
                    <div className={styles.lineSquare}>
                        <div className={styles.inputContainer}>
                            <div className={styles.infoBookReserva}>
                                <Image
                                    src="/Capa_dos_livros/o_diario_de_anne_frank.jpg"
                                    alt="O Diário de Anne Frank"
                                    width={667}
                                    height={1000}
                                    className={styles.imgReserva}
                                />
                                <div className={styles.livroInfo}>
                                    <div className={styles.headerLineSquare}>
                                        <div className={styles.title}>
                                            <p className={styles.geral}>Visão geral</p>
                                            <p className={styles.livro}>O Diário de Anne Frank</p>
                                        </div>
                                        <div className={styles.smallLineSquare}>
                                            <div className={styles.text}>
                                                <span className={styles.disponivel}>Disponíveis</span>
                                                <span className={styles.quant}>5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.resumo}>
                                        O Diário de Anne Frank é um livro que relata a história de uma jovem judia chamada Anne Frank, que viveu durante a Segunda Guerra Mundial
                                        e se escondeu com sua família e outros judeus em um anexo secreto em Amsterdã, nos Países Baixos, para escapar da perseguição nazista.
                                    </p>

                                </div>

                            </div>
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
                                    <span className={styles.titleInferior}>Anne Frank</span>
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
                                    <span className={styles.titleInferior}>Grupo Editorial Record</span>
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
                                    <span className={styles.titleInferior}>Autobiográfico</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.editar}>
                        <Link href="/reservarLivro/">
                            <span>
                                <button className={styles.reservButton}>Reservar livro</button>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
