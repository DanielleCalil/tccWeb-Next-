"use client"
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import BarraPesquisa from '@/componentes/barraPesquisa/page';

const genres = [
    'Todos',
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
        title: 'O diário de Anne Frank', 
        author: 'Anne Frank', 
        genre: 'Autobiografia', 
        image: '/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg', 
        course: 'Téc. Recursos Humanos' 
    },
    { 
        title: 'Dom Casmurro', 
        author: 'Machado de Assis', 
        genre: 'Romance', 
        image: '/Capa_dos_livros/Dom_Casmurro.jpg', 
        course: 'Téc. Contabilidade' 
    },
    { 
        title: 'Romeu e Julieta', 
        author: 'William Shakespeare', 
        genre: 'Romance', 
        image: '/Capa_dos_livros/Romeu_e_Julieta.jpg', 
        course: 'Téc. Design de Interiores' 
    },
    { 
        title: '1984', 
        author: 'George Orwell', 
        genre: 'Ficção Científica', 
        image: '/Capa_dos_livros/1984.jpg', 
        course: 'Téc. Informática' 
    },
    { 
        title: 'Os Miseráveis', 
        author: 'Victor Hugo', 
        genre: 'Romance', 
        image: '/Capa_dos_livros/Os_Miseraveis.jpg', 
        course: 'Téc. Administração' 
    },
    { 
        title: 'Orgulho e Preconceito', 
        author: 'Jane Austen', 
        genre: 'Romance', 
        image: '/Capa_dos_livros/Orgulho_e_Preconceito.png', 
        course: 'Téc. Farmácia' 
    },
];

export default function Recomendacoes() {
    const [selectedGenre, setSelectedGenre] = useState('Todos');

    // Filtra os livros com base no gênero selecionado
    const filteredBooks = selectedGenre === 'Todos'
        ? books
        : books.filter(book => book.genre === selectedGenre);

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.recomendacao}>Recomendações dos professores</h1>
                <BarraPesquisa />

                <div className={styles.genreButtons}>
                    {genres.map((genre) => (
                        <div
                            key={genre}
                            className={styles.bookGenre}
                            onClick={() => setSelectedGenre(genre)}
                        >
                            <Image
                                src={`/Icons TCC/${genre.replace(/\s+/g, '_')}.png`}
                                alt={genre}
                                width={512}
                                height={512}
                                className={styles.icon}
                            />
                            <p className={styles.textIcon}>{genre}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.container}>
                    <div className={styles.bookList}>
                        {filteredBooks.map((book) => (
                            <Link
                                key={book.title}
                                href="/infoLivroRecomendacao/"
                                className={styles.bookItem}
                            >
                                <p className={styles.bookCourse}>{book.course}</p>
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    width={100}
                                    height={150}
                                    className={styles.bookImage}
                                />
                                <div className={styles.bookInfo}>
                                    <h2 className={styles.bookTitle}>{book.title}</h2>
                                    <p className={styles.bookAuthor}>{book.author}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
