"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/services/api';

export default function Recomendacoes() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
    }

    const [books, setBooks] = useState([]);
    const router = useRouter();

    // Ordena os livros pelo título em ordem alfabética
    const sortedBooks = books.sort((a, b) => a.liv_nome.localeCompare(b.liv_nome));

    const [livNome, setlivNome] = useState('')

    function atLivNome(nome) {
        setlivNome(nome)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); 
        if (!user) {
            router.push('/usuarios/login');
        } else {
           // Chama listaLivros passando o curso do usuário
           listaLivros(user.cur_cod);        
        }
    }, []);

    async function listaLivros(curso) {

        const dados = { cur_cod: curso }

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
                        {sortedBooks.length > 0 ? (
                            sortedBooks.map(livroRec => (
                                <div className={styles.bookItem} key={livroRec.liv_nome}>
                                    <Link href={`/recomendacoes/${livroRec.liv_cod}`}>
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
                            ))
                        ) : (
                            <h1 className={styles.aviso}>Não há resultados para a requisição</h1>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
