import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import BarraPesquisa from '@/componentes/barraPesquisa/page';

export default function Biblioteca() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.biblioteca}>Biblioteca</h1>
                <Link href="#addModal">
                    <button className={styles.addButton}>+ Adicionar</button>
                </Link>
                <BarraPesquisa />
                <div className={styles.container}>
                    <div className={styles.genreButtons}>
                        {['todos', 'Policial e Suspense', 'Terror', 'Ação e Aventura', 'Autobiografia', 'Fantasia', 'Ficção Científica', 'Romance'].map((genre) => (
                            <div className={styles.bookGenre} key={genre}>
                                <Image
                                    src={`/Icons TCC/${genre}.png`}
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
                        {[
                            { 
                                src: '/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg', 
                                title: 'O diário de Anne Frank', 
                                author: 'Anne Frank' 
                            },
                            { 
                                src: '/Capa_dos_livros/Dom_Casmurro.jpg', 
                                title: 'Dom Casmurro', 
                                author: 'Machado de Assis' 
                            },
                            { 
                                src: '/Capa_dos_livros/Romeu_e_Julieta.jpg', 
                                title: 'Romeu e Julieta', 
                                author: 'William Shakespeare' 
                            },
                            { 
                                src: '/Capa_dos_livros/1984.jpg', 
                                title: '1984', 
                                author: 'George Orwell' 
                            },
                            { 
                                src: '/Capa_dos_livros/Os_Miseraveis.jpg', 
                                title: 'Os Miseráveis', 
                                author: 'Victor Hugo' 
                            },
                            { 
                                src: '/Capa_dos_livros/Orgulho_e_Preconceito.png', 
                                title: 'Orgulho e Preconceito', 
                                author: 'Jane Austen' 
                            },
                            { 
                                src: '/Capa_dos_livros/heartstopper.jpg', 
                                title: 'Heartstopper', 
                                author: 'Alice Oseman' 
                            },
                            { 
                                src: '/Capa_dos_livros/Procure_nas_cinzas.jpg', 
                                title: 'Procure nas Cinzas', 
                                author: 'Charlie Donlea' 
                            },
                            { 
                                src: '/Capa_dos_livros/Os_sete_maridos_de_Evelyn_Hugo.jpg', 
                                title: 'Os Sete Maridos de Evelyn Hugo', 
                                author: 'Taylor Jenkins Reid'
                            },
                            { 
                                src: '/Capa_dos_livros/A_Garota_do_Lago.jpg',
                                title: 'A Garota do Lago', 
                                author: 'Charlie Donlea' 
                            },
                            { 
                                src: '/Capa_dos_livros/verity.jpg', 
                                title: 'Verity', 
                                author: 'Colleen Hoover' 
                            },
                            { 
                                src: '/Capa_dos_livros/Harry_Potter_e_a_pedra_filosofal.jpg', 
                                title: 'Harry Potter e a Pedra Filosofal', 
                                author: 'J.K. Rowling' 
                            },
                            { 
                                src: '/Capa_dos_livros/A_Revolucao_dos_bichos.jpg', 
                                title: 'A Revolução dos Bichos', 
                                author: 'George Orwell' 
                            },
                            { 
                                src: '/Capa_dos_livros/Deixada_para_tras.jpg', 
                                title: 'Deixada para Trás', 
                                author: 'George Orwell' 
                            },
                            { 
                                src: '/Capa_dos_livros/dracula.jpg', 
                                title: 'Drácula', 
                                author: 'Bram Stoker' 
                            },
                        ].map(({ src, title, author }) => (
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

            <div id="addModal" className={styles.modal}>
                <div className={styles.modalContent}>
                    <Link href="#">
                        <div className={styles.closeButton}>&times;</div>
                    </Link>
                    <Link href="/addLivroExistente/">
                        <div className={styles.modalButton}>Adicionar livro existente</div>
                    </Link>
                    <Link href="/addLivroNovo/">
                        <div className={styles.modalButton}>Adicionar livro novo</div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
