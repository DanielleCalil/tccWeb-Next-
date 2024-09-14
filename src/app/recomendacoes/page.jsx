"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import BarraPesquisa from '@/componentes/barraPesquisa/page';
import api from '@/services/api';

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
        liv_nome: 'O diário de Anne Frank',
        aut_nome: 'Anne Frank',
        generos: 'Autobiografia',
        liv_foto_capa: '/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg',
        course: 'Téc. Recursos Humanos'
    },
    {
        liv_nome: 'Dom Casmurro',
        aut_nome: 'Machado de Assis',
        generos: 'Romance',
        liv_foto_capa: '/Capa_dos_livros/Dom_Casmurro.jpg',
        course: 'Téc. Contabilidade'
    },
    {
        liv_nome: 'Romeu e Julieta',
        aut_nome: 'William Shakespeare',
        generos: 'Romance',
        liv_foto_capa: '/Capa_dos_livros/Romeu_e_Julieta.jpg',
        course: 'Téc. Design de Interiores'
    },
    {
        liv_nome: '1984',
        aut_nome: 'George Orwell',
        generos: 'Ficção Científica',
        liv_foto_capa: '/Capa_dos_livros/1984.jpg',
        course: 'Téc. Informática'
    },
    {
        liv_nome: 'Os Miseráveis',
        aut_nome: 'Victor Hugo',
        generos: 'Romance',
        liv_foto_capa: '/Capa_dos_livros/Os_Miseraveis.jpg',
        course: 'Téc. Administração'
    },
    {
        liv_nome: 'Orgulho e Preconceito',
        aut_nome: 'Jane Austen',
        generos: 'Romance',
        liv_foto_capa: '/Capa_dos_livros/Orgulho_e_Preconceito.png',
        course: 'Téc. Farmácia'
    },
];

export default function Recomendacoes() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
    }

    const [books, setBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('Todos');

    // Filtra os livros com base no gênero selecionado
    const filteredBooks = selectedGenre === 'Todos'
        ? books
        : books.filter(book => book.generos === selectedGenre);

    // Ordena os livros pelo título em ordem alfabética
    const sortedBooks = filteredBooks.sort((a, b) => a.liv_nome.localeCompare(b.liv_nome));

    const [livNome, setlivNome] = useState('')

    function atLivNome(nome) {
        setlivNome(nome)
    }

    useEffect(() => {
        listaLivros();
    }, []);

    async function listaLivros() {
        const dados = {
            liv_nome: livNome
        }
        try {
            const response = await api.post('/livros', dados);
            console.log(response.data.dados);
            setBooks(response.data.dados);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }
    // console.log(livNome)

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.recomendacao}>Recomendações dos professores</h1>
                <BarraPesquisa livNome={livNome} atLivNome={atLivNome} listaLivros={listaLivros} />

                <div className={styles.genreButtons}>
                    {genres.map((generos) => (
                        <div
                            key={generos}
                            className={styles.bookGenre}
                            onClick={() => setSelectedGenre(generos)}
                        >
                            <Image
                                src={`/Icons TCC/${generos.replace(/\s+/g, '_')}.png`}
                                alt={generos}
                                width={512}
                                height={512}
                                className={styles.icon}
                            />
                            <p className={styles.textIcon}>{generos}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.container}>
                    <div className={styles.bookList}>
                        {sortedBooks.map((book) => (
                            <Link
                                key={book.liv_nome}
                                href="/infoLivroRecomendacao/"
                                className={styles.bookItem}
                            >
                                <p className={styles.bookCourse}>{book.course}</p>
                                <Image
                                    src={book.liv_foto_capa}
                                    alt={book.liv_nome}
                                    width={100}
                                    height={150}
                                    className={styles.bookImage}
                                />
                                <div className={styles.bookInfo}>
                                    <h2 className={styles.bookTitle}>{book.liv_nome}</h2>
                                    <p className={styles.bookAuthor}>{book.aut_nome}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
