import Image from "next/image";
import styles from './page.module.css';

export default function Recomendacoes() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <div className={styles.bookSection}>
                    <h1 className={styles.title}>Recomendações dos professores</h1>
                </div>
                <div className={styles.bookList}>
                    <div className={styles.bookItem}>
                        <p className={styles.bookCourse}>Téc. Recursos Humanos</p>
                        <Image
                            src="/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg"
                            alt="O diário de Anne Frank"
                            className={styles.bookImage}
                            width={150}
                            height={215}
                        />
                        <div className={styles.bookInfo}>
                            <h2 className={styles.bookTitle}>O diário de Anne Frank</h2>
                            <p className={styles.bookAuthor}>Anne Frank</p>
                        </div>
                    </div>
                    <div className={styles.bookItem}>
                        <p className={styles.bookCourse}>Téc. Contabilidade</p>
                        <Image
                            src="/Capa_dos_livros/Dom_Casmurro.jpg"
                            alt="Dom Casmurro"
                            className={styles.bookImage}
                            width={150}
                            height={215}
                        />
                        <div className={styles.bookInfo}>
                            <h2 className={styles.bookTitle}>Dom Casmurro</h2>
                            <p className={styles.bookAuthor}>Machado de Assis</p>
                        </div>
                    </div>
                    <div className={styles.bookItem}>
                        <p className={styles.bookCourse}>Téc. Design de Interiores</p>
                        <Image
                            src="/Capa_dos_livros/Romeu_e_Julieta.jpg"
                            alt="Romeu e Julieta"
                            className={styles.bookImage}
                            width={150}
                            height={215}
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
                            className={styles.bookImage}
                            width={150}
                            height={215}
                        />
                        <div className={styles.bookInfo}>
                            <h2 className={styles.bookTitle}>1984</h2>
                            <p className={styles.bookAuthor}>George Orwell</p>
                        </div>
                    </div>
                    <div className={styles.bookItem}>
                        <p className={styles.bookCourse}>Téc. Administração</p>
                        <Image
                            src="/Capa_dos_livros/Os_Miseraveis.jpg"
                            alt="Os Miseráveis"
                            className={styles.bookImage}
                            width={150}
                            height={215}
                        />
                        <div className={styles.bookInfo}>
                            <h2 className={styles.bookTitle}>Os Miseráveis</h2>
                            <p className={styles.bookAuthor}>Victor Hugo</p>

                        </div>
                    </div>
                    <div className={styles.bookItem}>
                        <p className={styles.bookCourse}>Téc. Farmácia</p>
                        <Image
                            src="/Capa_dos_livros/Orgulho_e_Preconceito.png"
                            alt="Orgulho e Preconceito"
                            className={styles.bookImage}
                            width={150}
                            height={215}
                        />
                        <div className={styles.bookInfo}>
                            <h2 className={styles.bookTitle}>Orgulho e Preconceito</h2>
                            <p className={styles.bookAuthor}>Jane Austen</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}