"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from "./page.module.css";
import BarraPesquisa from "@/componentes/barraPesquisa/page";
import ModalConfirmar from '@/componentes/modalConfirmar/page';
import api from '@/services/api';

// const books = useState[
//     {
//         liv_foto_capa: '/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg',
//         liv_nome: "O diário de Anne Frank",
//         aut_nome: "Anne Frank",
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Dom_Casmurro.jpg',
//         liv_nome: "Dom Casmurro",
//         aut_nome: "Machado de Assis",
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Romeu_e_Julieta.jpg',
//         liv_nome: "Romeu e Julieta",
//         aut_nome: "William Shakespeare",
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/1984.jpg',
//         liv_nome: "1984",
//         aut_nome: "George Orwell",
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Os_Miseraveis.jpg',
//         liv_nome: "Os Miseráveis",
//         aut_nome: "Victor Hugo",
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Orgulho_e_Preconceito.png',
//         liv_nome: 'Orgulho e Preconceito',
//         aut_nome: 'Jane Austen',
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/heartstopper.jpg',
//         liv_nome: 'Heartstopper',
//         aut_nome: 'Alice Oseman',
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Procure_nas_cinzas.jpg',
//         liv_nome: 'Procure nas Cinzas',
//         aut_nome: 'Charlie Donlea',
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Os_sete_maridos_de_Evelyn_Hugo.jpg',
//         liv_nome: 'Os Sete Maridos de Evelyn Hugo',
//         aut_nome: 'Taylor Jenkins Reid',
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/A_Garota_do_Lago.jpg',
//         liv_nome: 'A Garota do Lago',
//         aut_nome: 'Charlie Donlea',
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/verity.jpg',
//         liv_nome: 'Verity',
//         aut_nome: 'Colleen Hoover',
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Harry_Potter_e_a_pedra_filosofal.jpg',
//         liv_nome: 'Harry Potter e a Pedra Filosofal',
//         aut_nome: 'J.K. Rowling',
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/A_Revolucao_dos_bichos.jpg',
//         liv_nome: 'A Revolução dos Bichos',
//         aut_nome: 'George Orwell',
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/Deixada_para_tras.jpg',
//         liv_nome: 'Deixada para Trás',
//         aut_nome: 'George Orwell',
//         active: true
//     },
//     {
//         liv_foto_capa: '/Capa_dos_livros/dracula.jpg',
//         liv_nome: 'Drácula',
//         aut_nome: 'Bram Stoker',
//         active: true
//     },
// ];

const searchOptions = [
    { value: 'liv_nome', label: 'Livro' },
    { value: 'aut_nome', label: 'Autor' },
    { value: 'edt_nome', label: 'Editora' },
    { value: 'liv_cod', label: 'Código' },
];

export default function GerenciarLivroExistente() {

    const [books, setBooks] = useState({
        "liv_cod": 0,
        "liv_ativo": ''
    });

    const [selectedSearchOption, setSelectedSearchOption] = useState('liv_nome');

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };

    // const [showModalConfirm, setShowModalConfirm] = useState(false);
    const router = useRouter();

    // const openModalConfirm = () => setShowModalConfirm(true);
    // const closeModalConfirm = () => setShowModalConfirm(false);

    // const handleConfirm = () => {
    //     setShowModalConfirm(false); // Fecha o modal
    //     router.push('../biblioteca');
    // };

    // Ordenar livros em ordem alfabética pelo título
    // const sortedBooks = [...books].sort((a, b) => a.liv_nome.localeCompare(b.liv_nome));

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
            setBooks(response.data.dados);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }
    
    // const toggleBookStatus = async (liv_cod) => {
    //     const updatedBooks = books.map(book =>
    //         book.liv_cod === liv_cod ? { ...book, active: book.active === 1 ? 0 : 1 } : book
    //     );
    //     setBooks(updatedBooks);
    
    //     try {
    //         const book = updatedBooks.find(b => b.liv_cod === liv_cod);
    //         // await api.patch(`/liv_inativar/${liv_cod}`, { active: book.active });

    //         const response = await api.patch('/liv_inativar', books);
    //             if (response.data.sucesso) {
                    
    //             }
    
    //         // console.log(`Status do livro ${liv_cod} atualizado para ${book.active === 1 ? 1 : 0}`);
    //     } catch (error) {
    //         console.error('Erro ao atualizar o status do livro:', error);
    
    //         // Se houver erro, reverte a mudança no estado local
    //         const revertedBooks = books.map(book =>
    //             book.liv_cod === liv_cod ? { ...book, active: book.active === 1 ? 0 : 1 } : book
    //         );
    //         setBooks(revertedBooks);
    
    //         alert('Erro ao atualizar o status do livro. Tente novamente.');
    //     }
    // };

    const toggleBookStatus = async (liv_cod) => {
        const updatedBooks = books.map(book =>
            book.liv_cod === liv_cod ? { ...book, active: book.active === 1 ? 0 : 1 } : book
        );
        setBooks(updatedBooks);
        
        try {
            const bookToUpdate = updatedBooks.find(b => b.liv_cod === liv_cod);
            
            // Criar o objeto a ser enviado para a API
            const payload = {
                liv_cod: bookToUpdate.liv_cod, // Enviando o código do livro
                liv_ativo: bookToUpdate.active === 1 ? 1 : 0 // O novo status ativo
            };
    
            const response = await api.patch('/liv_inativar', payload);
            
            if (response.data.sucesso) {
                console.log(`Status do livro ${liv_cod} atualizado com sucesso.`);
            } else {
                throw new Error("Erro ao atualizar o status do livro.");
            }
        } catch (error) {
            console.error('Erro ao atualizar o status do livro:', error);
            
            // Reverte a mudança no estado local
            const revertedBooks = books.map(book =>
                book.liv_cod === liv_cod ? { ...book, active: book.active === 1 ? 0 : 1 } : book
            );
            setBooks(revertedBooks);
            
            alert('Erro ao atualizar o status do livro. Tente novamente.');
        }
    };
    

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.ativarLivroExistente}>Gerenciar livros existentes</h1>
                <div className={styles.container}>
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
                    <div className={styles.bookList}>
                        {books.length > 0 ? (
                            books.map(livro => (
                                <div
                                    className={`${styles.bookItem} ${!livro.active ? styles.inactive : ""}`}
                                    key={livro.liv_cod}
                                >
                                    <div>
                                        <Image
                                            loader={imageLoader} /* Quando imagem vem por URL */
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
                                    <div className={styles.toggleContainer}>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={livro.active === 1}
                                                onChange={() => toggleBookStatus(livro.liv_cod)} // Alterna o estado
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
                    {/* <div className={styles.editar}>
                        <button
                            type="submit"
                            onClick={openModalConfirm}
                            className={styles.addButton}
                        >
                            Salvar Alterações
                        </button>
                    </div> */}
                </div>
            </div>
            {/* <ModalConfirmar
                show={showModalConfirm}
                onClose={closeModalConfirm}
                onConfirm={handleConfirm}
            /> */}
        </main>
    );
}
