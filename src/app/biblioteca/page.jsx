"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import ModalAdd from '@/componentes/modalAdd/page';
import BarraPesquisa from '@/componentes/barraPesquisa/page';
import { IoOptions } from "react-icons/io5";
import api from '@/services/api';

const searchOptions = [
    { value: 'liv_nome', label: 'Livro' },
    { value: 'aut_nome', label: 'Autor' },
    { value: 'edt_nome', label: 'Editora' },
    { value: 'gen_nome', label: 'Gênero' },
    { value: 'liv_cod', label: 'Código' },
];

export default function Biblioteca() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
    }

    const [books, setBooks] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [selectedSearchOption, setSelectedSearchOption] = useState('liv_nome');

    // Ordena os livros pelo título em ordem alfabética
    const sortedBooks = books.sort((a, b) => a.liv_nome.localeCompare(b.liv_nome));

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
        const dados = { [selectedSearchOption]: livNome };
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
