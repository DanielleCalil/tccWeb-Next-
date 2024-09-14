"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { IoPencilSharp } from "react-icons/io5";

const infoLivros = [
    {
        liv_nome: 'Anne Frank',
        aut_nome: 'O Diário de Anne Frank',
        liv_foto_capa: '/Capa_dos_livros/o_diario_de_anne_frank.jpg',
        liv_desc: 'O Diário de Anne Frank, O emocionante relato que se tornou um dos livros mais lidos do mundo.\nO diário de Anne Frank foi publicado pela primeira vez em 1947 e faz parte do cânone literário do Holocausto. E agora, pela primeira vez, vem à luz esta edição em quadrinhos. O roteirista e diretor cinematográfico Ari Folman e o ilustrador David Polonsky demonstram com essa adaptação a dimensão e a genialidade literárias da jovem autora. Eles tornam visual o contemporâneo documento histórico de Anne Frank e traduzem o contexto da época no qual foi escrito. Baseada na edição definitiva do diário, autorizada por Otto Frank, pai de Anne – um dos livros mais vendidos do mundo, publicado no Brasil pela Editora Record , esta versão em quadrinhos torna tangível o destino dos oito habitantes do Anexo durante seus dias no esconderijo.',
        edt_nome: 'Record',
        generos: 'Autobiográfico',
    }
];

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
                {infoLivros.map((book, index) => (
                    <div className={styles.container} key={index}>
                        <div className={styles.lineSquare}>
                            <div className={styles.inputContainer}>
                                <div className={styles.infoBookReserva}>
                                    <Image
                                        src={infoLivros.liv_foto_capa}
                                        alt={infoLivros.liv_foto_capa}
                                        width={667}
                                        height={1000}
                                        className={styles.imgReserva}
                                    />
                                    <div className={styles.livroInfo}>
                                        <div className={styles.headerLineSquare}>
                                            <div className={styles.title}>
                                                <p className={styles.geral}>Visão geral</p>
                                                <p className={styles.livro}>{infoLivros.liv_nome}</p>
                                            </div>
                                            <div className={styles.smallLineSquare}>
                                                <div className={styles.text}>
                                                    <span className={styles.disponivel}>Disponíveis</span>
                                                    <span className={styles.quant}>5</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={styles.resumo}>{infoLivros.liv_desc}</p>
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
                                        <span className={styles.titleInferior}>{infoLivros.aut_nome}</span>
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
                                        <span className={styles.titleInferior}>{infoLivros.edt_nome}</span>
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
                                        <span className={styles.titleInferior}>{infoLivros.generos}</span>
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
                ))}
            </div>
        </main>
    );
}
