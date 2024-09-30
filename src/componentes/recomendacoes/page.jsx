"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from './page.module.css';
import Link from 'next/link';
import api from '@/services/api';

// Lista de livros
// const books = [
//     {
//         src: "/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg",
//         title: "O diário de Anne Frank",
//         author: "Anne Frank",
//         course: "Téc. Recursos Humanos",
//         active: true
//     },
//     {
//         src: "/Capa_dos_livros/Dom_Casmurro.jpg",
//         title: "Dom Casmurro",
//         author: "Machado de Assis",
//         course: "Téc. Contabilidade",
//         active: true
//     },
//     {
//         src: "/Capa_dos_livros/Romeu_e_Julieta.jpg",
//         title: "Romeu e Julieta",
//         author: "William Shakespeare",
//         course: "Téc. Design de Interiores",
//         active: true
//     },
//     {
//         src: "/Capa_dos_livros/1984.jpg",
//         title: "1984",
//         author: "George Orwell",
//         course: "Téc. Informática",
//         active: true
//     },
//     {
//         src: "/Capa_dos_livros/Os_Miseraveis.jpg",
//         title: "Os Miseráveis",
//         author: "Victor Hugo",
//         course: "Téc. Administração",
//         active: true
//     },
//     {
//         src: "/Capa_dos_livros/Orgulho_e_Preconceito.png",
//         title: "Orgulho e Preconceito",
//         author: "Jane Austen",
//         course: "Téc. Farmácia",
//         active: true
//     }
// ];

export default function Recomendacoes() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
    }

    const [books, setBooks] = useState([]);

    // Ordena os livros pelo título em ordem alfabética
    const sortedBooks = books.sort((a, b) => a.liv_nome.localeCompare(b.liv_nome));

    const [livNome, setlivNome] = useState('')

    function atLivNome(nome) {
        setlivNome(nome)
    }

    useEffect(() => {
        listaLivros();
    }, []);

    async function listaLivros() {
        const dados = {
            cur_cod: 85
        }
        try {
            const response = await api.post('/rec_listar', dados);
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

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <div className={styles.bookSection}>
                    <h1 className={styles.title}>Recomendações dos professores</h1>
                </div>
                <div className={styles.container}>
                    <div className={styles.bookList}>
                        {sortedBooks.map(livroRec => (
                            <div className={styles.bookItem} key={livroRec.liv_nome}>
                                <Link href={`/recLivro/${livroRec.liv_cod}`}>
                                    <div>
                                        <p className={styles.bookCourse}>{livroRec.cur_nome}</p>
                                        <Image
                                            loader={imageLoader} /* Quando imagem vem por url */
                                            src={livroRec.liv_foto_capa}
                                            alt={livroRec.liv_nome}
                                            width={100}
                                            height={150}
                                            className={styles.bookImage}
                                        />
                                        <div className={styles.bookInfo}>
                                            <h2 className={styles.bookTitle}>{livroRec.liv_nome}</h2>
                                            <p className={styles.bookAuthor}>{livroRec.aut_nome}</p>
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
