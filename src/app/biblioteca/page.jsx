"use client"
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import BarraPesquisa from '@/componentes/barraPesquisa/page';
import Modal from '@/componentes/modal/page';

const genres = [
    'todos',
    'Policial e Suspense',
    'Terror',
    'Ação e Aventura',
    'Autobiografia',
    'Fantasia',
    'Ficção Científica',
    'Romance'
];

const books = [
    {
        src: '/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg',
        title: 'O diário de Anne Frank',
        author: 'Anne Frank',
        genre: 'Autobiografia'
    },
    {
        src: '/Capa_dos_livros/Dom_Casmurro.jpg',
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        genre: 'Romance'
    },
    {
        src: '/Capa_dos_livros/Romeu_e_Julieta.jpg',
        title: 'Romeu e Julieta',
        author: 'William Shakespeare',
        genre: 'Romance'
    },
    {
        src: '/Capa_dos_livros/1984.jpg',
        title: '1984',
        author: 'George Orwell',
        genre: 'Ficção Científica'
    },
    {
        src: '/Capa_dos_livros/Os_Miseraveis.jpg',
        title: 'Os Miseráveis',
        author: 'Victor Hugo',
        genre: 'Romance'
    },
    {
        src: '/Capa_dos_livros/Orgulho_e_Preconceito.png',
        title: 'Orgulho e Preconceito',
        author: 'Jane Austen',
        genre: 'Romance'
    },
    {
        src: '/Capa_dos_livros/heartstopper.jpg',
        title: 'Heartstopper',
        author: 'Alice Oseman',
        genre: 'Romance'
    },
    {
        src: '/Capa_dos_livros/Procure_nas_cinzas.jpg',
        title: 'Procure nas Cinzas',
        author: 'Charlie Donlea',
        genre: 'Policial e Suspense'
    },
    {
        src: '/Capa_dos_livros/Os_sete_maridos_de_Evelyn_Hugo.jpg',
        title: 'Os Sete Maridos de Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        genre: 'Romance'
    },
    {
        src: '/Capa_dos_livros/A_Garota_do_Lago.jpg',
        title: 'A Garota do Lago',
        author: 'Charlie Donlea',
        genre: 'Policial e Suspense'
    },
    {
        src: '/Capa_dos_livros/verity.jpg',
        title: 'Verity',
        author: 'Colleen Hoover',
        genre: 'Romance'
    },
    {
        src: '/Capa_dos_livros/Harry_Potter_e_a_pedra_filosofal.jpg',
        title: 'Harry Potter e a Pedra Filosofal',
        author: 'J.K. Rowling',
        genre: 'Fantasia'
    },
    {
        src: '/Capa_dos_livros/A_Revolucao_dos_bichos.jpg',
        title: 'A Revolução dos Bichos',
        author: 'George Orwell',
        genre: 'Ficção Científica'
    },
    {
        src: '/Capa_dos_livros/Deixada_para_tras.jpg',
        title: 'Deixada para Trás',
        author: 'George Orwell',
        genre: 'Policial e Suspense'
    },
    {
        src: '/Capa_dos_livros/dracula.jpg',
        title: 'Drácula',
        author: 'Bram Stoker',
        genre: 'Terror'
    },
];

export default function Biblioteca() {
    const [selectedGenre, setSelectedGenre] = useState('todos');

    const filteredBooks = selectedGenre === 'todos'
        ? books
        : books.filter(book => book.genre === selectedGenre);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.biblioteca}>Biblioteca</h1>
                <div>
                    <button onClick={openModal}>+ Adicionar</button>
                    <Modal show={showModal} onClose={closeModal} />
                    {/* Outros conteúdos da página */}
                </div>
                <BarraPesquisa />
                <div className={styles.container}>
                    <div className={styles.genreButtons}>
                        {genres.map((genre) => (
                            <div
                                className={styles.bookGenre}
                                key={genre}
                                onClick={() => setSelectedGenre(genre)}
                            >
                                <Image
                                    src={`/Icons TCC/${genre.replace(/\s+/g, '_')}.png`}
                                    alt={genre}
                                    width={50}
                                    height={50}
                                    className={styles.icon}
                                />
                                <p className={styles.textIcon}>{genre}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.bookList}>
                        {filteredBooks.map(({ src, title, author }) => (
                            <div className={styles.bookItem} key={title}>
                                <Link href="/infoLivroBiblioteca/">
                                    <div>
                                        <Image
                                            src={src}
                                            alt={title}
                                            width={150}
                                            height={200}
                                            className={styles.bookImage}
                                        />
                                        <div className={styles.bookInfo}>
                                            <h2 className={styles.bookTitle}>{title}</h2>
                                            <p className={styles.bookAuthor}>{author}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
