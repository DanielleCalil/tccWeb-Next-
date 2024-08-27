import Image from "next/image";
import styles from './index.module.css';

export default function Recomendacoes() {
    return (
        <div className="containerGlobal">
            <div className={styles.bookSection}>
                <text className={styles.title}>Recomendações dos professores</text>
            </div>
            <div className={styles.bookList}>
                <div className={styles.bookItem}>
                    <p className={styles.bookCourse}>Téc. Recursos Humanos</p>
                    <Image
                        src="/Capa_dos_livros/o diário de anne frank.jpg"
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
                        src="/Capa_dos_livros/dom casmurro.jpg"
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
                        src="/Capa_dos_livros/romeu e julieta.jpg"
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
                        src="/Capa_dos_livros/os miseráveis.jpg"
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
                        src="/Capa_dos_livros/orgulho e preconceito.png"
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
    )
}