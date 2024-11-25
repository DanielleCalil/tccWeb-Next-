"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from "./page.module.css";
import BarraPesquisa from "@/componentes/barraPesquisa/page";
import api from '@/services/api';

const searchOptions = [
    { value: 'liv_nome', label: 'Livro' },
    { value: 'aut_nome', label: 'Autor' },
    { value: 'edt_nome', label: 'Editora' },
];

export default function GerenciarLivroExistente() {
    const [books, setBooks] = useState([]);
    const [selectedSearchOption, setSelectedSearchOption] = useState('liv_nome');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        if (!src) return ''; // Retorna vazio se o src estiver ausente
        if (!apiUrl || !apiPorta) {
            console.error('Variáveis de ambiente para API não configuradas corretamente.');
            return '';
        }
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };


    const router = useRouter();

    const [livNome, setLivNome] = useState('');

    function atLivNome(nome) {
        setLivNome(nome);
    }

    useEffect(() => {
        listaLivros();
    }, []);

    async function listaLivros() {
        const dados = { [selectedSearchOption]: livNome };
        try {
            const response = await api.post('/liv_gerenciar', dados);
            console.log(response.data.dados);

            // Adicionamos a atualização do estado `liv_ativo` para refletir os dados reais da API
            const updatedBooks = response.data.dados.map(book => ({
                ...book,
                liv_ativo: book.liv_ativo // garante que o valor de `liv_ativo` seja o correto ao carregar
            }));

            setBooks(updatedBooks); // Atualiza o estado com os livros e seus status reais

        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    const toggleBookStatus = async (liv_cod, exe_cod, exe_ativo, liv_ativo) => {
        try {
            // Define a rota correta com base no estado atual
            
            const route = liv_ativo === 0 ? '/liv_ativar' : '/liv_inativar';
    
            // Inclui os valores adicionais no payload
            const payload = {
                liv_cod
            };
    
            // Faz a solicitação à API
            const response = await api.patch(route, payload);
    
            if (response.status === 200) {
                // Atualiza o estado local dos livros
                const updatedBooks = books.map(book => {
                    if (book.liv_cod === liv_cod) {
                        return {
                            ...book,
                            exemplares: Array.isArray(book.exemplares)
                                ? book.exemplares.map(exemplar => {
                                    if (exemplar.exe_cod === exe_cod) {
                                        return {
                                            ...exemplar,
                                            exe_ativo: exe_ativo === 0 ? 1 : 0, // Atualiza o valor do `exe_ativo`
                                        };
                                    }
                                    return exemplar;
                                })
                                : [],
                        };
                    }
                    return book;
                });
    
                setBooks(updatedBooks); // Atualiza a lista de livros no estado
                console.log(response.data.message);
            } else {
                throw new Error(`Erro: ${response.status}`);
            }
            listaLivros();
        } catch (error) {
            console.error("Erro ao alterar status:", error.message);
            alert("Não foi possível alterar o status do livro.");
        }
    };
    
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.ativarLivroExistente}>Gerenciar livros existentes</h1>
                <div className={styles.container}>
                    <div className={styles.bookList}>
                        {books.length > 0 ? (
                            books.map(livro => (
                                <div
                                    key={livro.liv_cod}
                                    className={`${styles.bookItem} ${livro.liv_ativo === 1 ? styles.ativo : styles.inativo}`}
                                >
                                    <div>
                                        {livro.liv_foto_capa ? (
                                            <Image
                                                loader={imageLoader}
                                                src={livro.liv_foto_capa}
                                                alt={livro.liv_nome || 'Capa do livro'}
                                                width={100}
                                                height={150}
                                                className={styles.bookImage}
                                            />
                                        ) : (
                                            <div className={styles.placeholderImage}>Imagem não disponível</div>
                                        )}

                                        <div className={styles.bookInfo}>
                                            <h2 className={styles.bookTitle}>{livro.liv_nome}</h2>
                                            <p className={styles.bookAuthor}>{livro.aut_nome}</p>
                                        </div>
                                    </div>
                                    <div className={styles.toggleContainer}>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={livro.liv_ativo === 1}
                                                onChange={() => toggleBookStatus(livro.liv_cod, livro.exe_cod, livro.exe_ativo, livro.liv_ativo)}
                                            />
                                            <span className={`${styles.slider} ${styles.round}`}></span>
                                        </label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>Não há resultados para a requisição</h1>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
