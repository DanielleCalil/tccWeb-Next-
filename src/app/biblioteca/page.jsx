"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import ModalAdd from '@/componentes/modalAdd/page';
import BarraPesquisa from '@/componentes/barraPesquisa/page';
import { IoOptions } from "react-icons/io5";
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

// const books = [
//     {
//         liv_foto_capa: '/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg',
//         liv_nome: 'O diário de Anne Frank',
//         aut_nome: 'Anne Frank',
//         generos: 'Autobiografia',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Dom_Casmurro.jpg',
//         liv_nome: 'Dom Casmurro',
//         aut_nome: 'Machado de Assis',
//         generos: 'Romance',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Romeu_e_Julieta.jpg',
//         liv_nome: 'Romeu e Julieta',
//         aut_nome: 'William Shakespeare',
//         generos: 'Romance',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/1984.jpg',
//         liv_nome: '1984',
//         aut_nome: 'George Orwell',
//         generos: 'Ficção Científica',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Os_Miseraveis.jpg',
//         liv_nome: 'Os Miseráveis',
//         aut_nome: 'Victor Hugo',
//         generos: 'Romance',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Orgulho_e_Preconceito.png',
//         liv_nome: 'Orgulho e Preconceito',
//         aut_nome: 'Jane Austen',
//         generos: 'Romance',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/heartstopper.jpg',
//         liv_nome: 'Heartstopper',
//         aut_nome: 'Alice Oseman',
//         generos: 'Romance',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Procure_nas_cinzas.jpg',
//         liv_nome: 'Procure nas Cinzas',
//         aut_nome: 'Charlie Donlea',
//         generos: 'Policial e Suspense',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Os_sete_maridos_de_Evelyn_Hugo.jpg',
//         liv_nome: 'Os Sete Maridos de Evelyn Hugo',
//         aut_nome: 'Taylor Jenkins Reid',
//         generos: 'Romance',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/A_Garota_do_Lago.jpg',
//         liv_nome: 'A Garota do Lago',
//         aut_nome: 'Charlie Donlea',
//         generos: 'Policial e Suspense',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/verity.jpg',
//         liv_nome: 'Verity',
//         aut_nome: 'Colleen Hoover',
//         generos: 'Romance',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Harry_Potter_e_a_pedra_filosofal.jpg',
//         liv_nome: 'Harry Potter e a Pedra Filosofal',
//         aut_nome: 'J.K. Rowling',
//         generos: 'Fantasia',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/A_Revolucao_dos_bichos.jpg',
//         liv_nome: 'A Revolução dos Bichos',
//         aut_nome: 'George Orwell',
//         generos: 'Ficção Científica',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Deixada_para_tras.jpg',
//         liv_nome: 'Deixada para Trás',
//         aut_nome: 'George Orwell',
//         generos: 'Policial e Suspense',
//         active: true 
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/dracula.jpg',
//         liv_nome: 'Drácula',
//         aut_nome: 'Bram Stoker',
//         generos: 'Terror',
//         active: true 
//     },
// ];

export default function Biblioteca() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
    }

    const [books, setBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('Todos');
    const [showModalAdd, setShowModalAdd] = useState(false);

    // Filtra os livros com base no gênero selecionado
    const filteredBooks = books
        .filter(book => selectedGenre === 'Todos' || book.generos === selectedGenre);

    // Ordena os livros pelo título em ordem alfabética
    const sortedBooks = filteredBooks.sort((a, b) => a.liv_nome.localeCompare(b.liv_nome));

    const openModalAdd = () => setShowModalAdd(true);
    const closeModalAdd = () => setShowModalAdd(false);

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
                <h1 className={styles.biblioteca}>Biblioteca</h1>
                <div className={styles.contButton}>
                    <button onClick={openModalAdd} className={styles.addButton}>
                        <IoOptions className={styles.tpiconAdm} />
                        Administrar
                    </button>
                    <ModalAdd show={showModalAdd} onClose={closeModalAdd} />
                </div>
                <BarraPesquisa livNome={livNome} atLivNome={atLivNome} listaLivros={listaLivros} />
                <div className={styles.genreButtons}>
                    {genres.map((generos) => (
                        <div
                            className={styles.bookGenre}
                            key={generos}
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
                        {sortedBooks.map(livro => (
                            <div className={styles.bookItem} key={livro.liv_nome}>
                                <Link href={`/livros/${livro.liv_cod}`}>
                                    <div>
                                        <Image
                                            loader={imageLoader} /* Quando imagem vem por url */
                                            src={livro.liv_foto_capa}
                                            alt={livro.liv_nome}
                                            width={100}
                                            height={150}
                                            className={styles.bookImage}
                                        />
                                        <div className={styles.bookInfo}>
                                            <h2 className={styles.bookTitle}>{livro.liv_nome}</h2>
                                            <p className={styles.bookAuthor}>{livro.aut_nome}</p>
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
