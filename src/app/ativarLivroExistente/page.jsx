"use client"
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import styles from "./page.module.css";

export default function AtivarLivroExistente() {
    // Estado para armazenar os livros com suas imagens, título, autor e status
    const [books, setBooks] = useState([
        {
            src: '/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg',
            title: "O diário de Anne Frank",
            author: "Anne Frank",
            active: true
        },
        {
            src: '/Capa_dos_livros/Dom_Casmurro.jpg',
            title: "Dom Casmurro",
            author: "Machado de Assis",
            active: true
        },
        {
            src: '/Capa_dos_livros/Romeu_e_Julieta.jpg',
            title: "Romeu e Julieta",
            author: "William Shakespeare",
            active: true
        },
        {
            src: '/Capa_dos_livros/1984.jpg',
            title: "1984",
            author: "George Orwell",
            active: true
        },
        {
            src: '/Capa_dos_livros/Os_Miseraveis.jpg',
            title: "Os Miseráveis",
            author: "Victor Hugo",
            active: true
        },
        {
            src: '/Capa_dos_livros/Orgulho_e_Preconceito.png',
            title: 'Orgulho e Preconceito',
            author: 'Jane Austen',
            active: true
        },
        {
            src: '/Capa_dos_livros/heartstopper.jpg',
            title: 'Heartstopper',
            author: 'Alice Oseman',
            active: true
        },
        {
            src: '/Capa_dos_livros/Procure_nas_cinzas.jpg',
            title: 'Procure nas Cinzas',
            author: 'Charlie Donlea',
            active: true
        },
        {
            src: '/Capa_dos_livros/Os_sete_maridos_de_Evelyn_Hugo.jpg',
            title: 'Os Sete Maridos de Evelyn Hugo',
            author: 'Taylor Jenkins Reid',
            active: true
        },
        {
            src: '/Capa_dos_livros/A_Garota_do_Lago.jpg',
            title: 'A Garota do Lago',
            author: 'Charlie Donlea',
            active: true
        },
        {
            src: '/Capa_dos_livros/verity.jpg',
            title: 'Verity',
            author: 'Colleen Hoover',
            active: true
        },
        {
            src: '/Capa_dos_livros/Harry_Potter_e_a_pedra_filosofal.jpg',
            title: 'Harry Potter e a Pedra Filosofal',
            author: 'J.K. Rowling',
            active: true
        },
        {
            src: '/Capa_dos_livros/A_Revolucao_dos_bichos.jpg',
            title: 'A Revolução dos Bichos',
            author: 'George Orwell',
            active: true
        },
        {
            src: '/Capa_dos_livros/Deixada_para_tras.jpg',
            title: 'Deixada para Trás',
            author: 'George Orwell',
            active: true
        },
        {
            src: '/Capa_dos_livros/dracula.jpg',
            title: 'Drácula',
            author: 'Bram Stoker',
            active: true
        },
    ]);

    // Função para ativar/inativar um livro
    const toggleBookStatus = (index) => {
        const updatedBooks = [...books];
        updatedBooks[index].active = !updatedBooks[index].active;
        setBooks(updatedBooks);
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.ativarLivroExistente}>Gerenciar Livros</h1>
                <div className={styles.container}>
                    <div className={styles.bookList}>
                        {books.map(({ src, title, author, active }, index) => (
                            <div
                                className={`${styles.bookItem} ${!active ? styles.inactive : ""}`}
                                key={title}
                            >
                                <Link href="/infoLivroBiblioteca">
                                    <div>
                                        <Image
                                            src={src}
                                            alt={title}
                                            width={100}
                                            height={150}
                                            className={styles.bookImage}
                                        />
                                        <div className={styles.bookInfo}>
                                            <h2 className={styles.bookTitle}>{title}</h2>
                                            <p className={styles.bookAuthor}>{author}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className={styles.toggleContainer}>
                                    <label className={styles.switch}>
                                        <input
                                            type="checkbox"
                                            checked={active}
                                            onChange={() => toggleBookStatus(index)}
                                        />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.editar}>
                <Link href="/biblioteca/">
                    <button className={styles.addButton}>Salvar Alterações</button>
                </Link>
            </div>
        </main>
    );
}
