import Image from "next/image";
import styles from './page.module.css';
import Link from 'next/link';

export default function Recomendacoes() {
    // Lista de livros
    const books = [
        { 
            src: "/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg", 
            title: "O diário de Anne Frank", 
            author: "Anne Frank", 
            course: "Téc. Recursos Humanos", 
            active: true 
        },
        { 
            src: "/Capa_dos_livros/Dom_Casmurro.jpg", 
            title: "Dom Casmurro", 
            author: "Machado de Assis", 
            course: "Téc. Contabilidade", 
            active: true 
        },
        { 
            src: "/Capa_dos_livros/Romeu_e_Julieta.jpg", 
            title: "Romeu e Julieta", 
            author: "William Shakespeare", 
            course: "Téc. Design de Interiores", 
            active: true 
        },
        { 
            src: "/Capa_dos_livros/1984.jpg", 
            title: "1984", 
            author: "George Orwell", 
            course: "Téc. Informática", 
            active: true 
        },
        { 
            src: "/Capa_dos_livros/Os_Miseraveis.jpg", 
            title: "Os Miseráveis", 
            author: "Victor Hugo", 
            course: "Téc. Administração", 
            active: true 
        },
        { 
            src: "/Capa_dos_livros/Orgulho_e_Preconceito.png", 
            title: "Orgulho e Preconceito", 
            author: "Jane Austen", 
            course: "Téc. Farmácia", 
            active: true 
        }
    ];

    // Ordenar livros em ordem alfabética pelo título
    const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <div className={styles.bookSection}>
                    <h1 className={styles.title}>Recomendações dos professores</h1>
                </div>
                <div className={styles.bookList}>
                    {sortedBooks.map(({ src, title, author, course }) => (
                        <div className={styles.bookItem} key={title}>
                            <Link href="/infoLivroRecomendacao">
                                <p className={styles.bookCourse}>{course}</p>
                                <Image
                                    src={src}
                                    alt={title}
                                    className={styles.bookImage}
                                    width={150}
                                    height={215}
                                />
                                <div className={styles.bookInfo}>
                                    <h2 className={styles.bookTitle}>{title}</h2>
                                    <p className={styles.bookAuthor}>{author}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
