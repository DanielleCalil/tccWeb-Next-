"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import BarraPesquisa from '@/componentes/barraPesquisa/page';
import { IoOptions } from "react-icons/io5";
import api from '@/services/api';

const searchOptions = [
    { value: 'liv_nome', label: 'Livro' },
    { value: 'aut_nome', label: 'Autor' },
    { value: 'edt_nome', label: 'Editora' },
    { value: 'gen_nome', label: 'Gênero' },
    { value: 'rcm_cod', label: 'Código' },
    { value: 'cur_nome', label: 'Curso' },
];

// const books = [
//     {
//         liv_nome: 'O diário de Anne Frank',
//         aut_nome: 'Anne Frank',
//         generos: 'Autobiografia',
//         liv_foto_capa: '/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg',
//         course: 'Téc. Recursos Humanos'
//     },
//     {
//         liv_nome: 'Dom Casmurro',
//         aut_nome: 'Machado de Assis',
//         generos: 'Romance',
//         liv_foto_capa: '/Capa_dos_livros/Dom_Casmurro.jpg',
//         course: 'Téc. Contabilidade'
//     },
//     {
//         liv_nome: 'Romeu e Julieta',
//         aut_nome: 'William Shakespeare',
//         generos: 'Romance',
//         liv_foto_capa: '/Capa_dos_livros/Romeu_e_Julieta.jpg',
//         course: 'Téc. Design de Interiores'
//     },
//     {
//         liv_nome: '1984',
//         aut_nome: 'George Orwell',
//         generos: 'Ficção Científica',
//         liv_foto_capa: '/Capa_dos_livros/1984.jpg',
//         course: 'Téc. Informática'
//     },
//     {
//         liv_nome: 'Os Miseráveis',
//         aut_nome: 'Victor Hugo',
//         generos: 'Romance',
//         liv_foto_capa: '/Capa_dos_livros/Os_Miseraveis.jpg',
//         course: 'Téc. Administração'
//     },
//     {
//         liv_nome: 'Orgulho e Preconceito',
//         aut_nome: 'Jane Austen',
//         generos: 'Romance',
//         liv_foto_capa: '/Capa_dos_livros/Orgulho_e_Preconceito.png',
//         course: 'Téc. Farmácia'
//     },
// ];

export default function Recomendacoes() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    }

    const [books, setBooks] = useState([]);
    const [selectedSearchOption, setSelectedSearchOption] = useState('liv_nome');

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
            cur_cod: 85,
            [selectedSearchOption]: livNome
        };
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


    // console.log(livNome)

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.recomendacao}>Recomendações dos professores</h1>
                <BarraPesquisa livNome={livNome} atLivNome={atLivNome} listaLivros={listaLivros} />

                {/* Radio Buttons para selecionar o critério de pesquisa */}
                <div className={styles.searchOptions}>
                    {searchOptions.map(option => (
                        <label key={option.value} className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="searchOption"
                                value={option.value}
                                checked={selectedSearchOption === option.value}
                                onChange={() => setSelectedSearchOption(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>

                <div className={styles.container}>
                    <div className={styles.bookList}>
                        {sortedBooks.map(livroRec => (
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
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
