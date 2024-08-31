import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import BarraPesquisa from '@/componentes/barraPesquisa';

export default function Recomendacoes() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.recomendacao}>Recomendações dos professores</h1>
                <BarraPesquisa />

                <div className={styles.genreButtons}>
                    <div className={styles.bookGenre}>
                        <Image
                            src="/Icons TCC/todos.png"
                            alt="Todos"
                            width={24}
                            height={24}
                            className={styles.icon}
                        />
                        <p className={styles.textIcon}>Todos</p>
                    </div>
                    <div className={styles.bookGenre}>
                        <Image
                            src="/Icons TCC/Policial e Suspense.png"
                            alt="Policial e Suspense"
                            width={24}
                            height={24}
                            className={styles.icon}
                        />
                        <p className={styles.textIcon}>Policial e Suspense</p>
                    </div>
                    <div className={styles.bookGenre}>
                        <Image
                            src="/Icons TCC/Terror.png"
                            alt="Terror"
                            width={24}
                            height={24}
                            className={styles.icon}
                        />
                        <p className={styles.textIcon}>Terror</p>
                    </div>
                    <div className={styles.bookGenre}>
                        <Image
                            src="/Icons TCC/Ação e Aventura.png"
                            alt="Ação e Aventura"
                            width={24}
                            height={24}
                            className={styles.icon}
                        />
                        <p className={styles.textIcon}>Ação e Aventura</p>
                    </div>
                    <div className={styles.bookGenre}>
                        <Image
                            src="/Icons TCC/Autobiografia.png"
                            alt="Autobiografia"
                            width={24}
                            height={24}
                            className={styles.icon}
                        />
                        <p className={styles.textIcon}>Autobiografia</p>
                    </div>
                    <div className={styles.bookGenre}>
                        <Image
                            src="/Icons TCC/Fantasia.png"
                            alt="Fantasia"
                            width={24}
                            height={24}
                            className={styles.icon}
                        />
                        <p className={styles.textIcon}>Fantasia</p>
                    </div>
                    <div className={styles.bookGenre}>
                        <Image
                            src="/Icons TCC/Ficção Científica.png"
                            alt="Ficção Científica"
                            width={24}
                            height={24}
                            className={styles.icon}
                        />
                        <p className={styles.textIcon}>Ficção Científica</p>
                    </div>
                    <div className={styles.bookGenre}>
                        <Image
                            src="/Icons TCC/Romance.png"
                            alt="Romance"
                            width={24}
                            height={24}
                            className={styles.icon}
                        />
                        <p className={styles.textIcon}>Romance</p>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.bookList}>
                        <Link
                            href="/infoLivroRecomendacao/"
                            className={styles.bookItem}
                        >
                            <p className={styles.bookCourse}>Téc. Recursos Humanos</p>
                            <Image
                                src="/Capa_dos_livros/o diário de anne frank.jpg"
                                alt="O diário de Anne Frank"
                                width={100}
                                height={150}
                                className={styles.bookImage}
                            />
                            <div className={styles.bookInfo}>
                                <h2 className={styles.bookTitle}>O diário de Anne Frank</h2>
                                <p className={styles.bookAuthor}>Anne Frank</p>
                            </div>
                        </Link>
                        <div className={styles.bookItem}>
                            <p className={styles.bookCourse}>Téc. Contabilidade</p>
                            <Image
                                src="/Capa_dos_livros/dom casmurro.jpg"
                                alt="Dom Casmurro"
                                width={100}
                                height={150}
                                className={styles.bookImage}
                            />
                            <div className={styles.bookInfo}>
                                <h2 className={styles.bookTitle}>Dom Casmurro</h2>
                                <p className={styles.bookAuthor}>Machado de Assis</p>
                            </div>
                        </div>
                        <div className={styles.bookItem}>
                            <p className={styles.bookCourse}>Téc. Design de Interiores</p>
                            <Image
                                src="/Capa_dos_livros/romeu e julieta.jpg"
                                alt="Romeu e Julieta"
                                width={100}
                                height={150}
                                className={styles.bookImage}
                            />
                            <div className={styles.bookInfo}>
                                <h2 className={styles.bookTitle}>Romeu e Julieta</h2>
                                <p className={styles.bookAuthor}>William Shakespeare</p>
                            </div>
                        </div>
                        <div className={styles.bookItem}>
                            <p className={styles.bookCourse}>Téc. Informática</p>
                            <Image
                                src="/Capa_dos_livros/1984.jpg"
                                alt="1984"
                                width={100}
                                height={150}
                                className={styles.bookImage}
                            />
                            <div className={styles.bookInfo}>
                                <h2 className={styles.bookTitle}>1984</h2>
                                <p className={styles.bookAuthor}>George Orwell</p>
                            </div>
                        </div>
                        <div className={styles.bookItem}>
                            <p className={styles.bookCourse}>Téc. Administração</p>
                            <Image
                                src="/Capa_dos_livros/os miseráveis.jpg"
                                alt="Os Miseráveis"
                                width={100}
                                height={150}
                                className={styles.bookImage}
                            />
                            <div className={styles.bookInfo}>
                                <h2 className={styles.bookTitle}>Os Miseráveis</h2>
                                <p className={styles.bookAuthor}>Victor Hugo</p>
                            </div>
                        </div>
                        <div className={styles.bookItem}>
                            <p className={styles.bookCourse}>Téc. Farmácia</p>
                            <Image
                                src="/Capa_dos_livros/orgulho e preconceito.png"
                                alt="Orgulho e Preconceito"
                                width={100}
                                height={150}
                                className={styles.bookImage}
                            />
                            <div className={styles.bookInfo}>
                                <h2 className={styles.bookTitle}>Orgulho e Preconceito</h2>
                                <p className={styles.bookAuthor}>Jane Austen</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
