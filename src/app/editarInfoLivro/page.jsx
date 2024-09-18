"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import FileInput from '@/componentes/FileInput/page';
import api from '@/services/api';

export default function EditarInformacoesLivro() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(true);
    const [title, setTitle] = useState(liv_nome);
    const [availableQuantity, setAvailableQuantity] = useState(5);
    const [summary, setSummary] = useState(liv_desc);
    const [author, setAuthor] = useState(aut_nome);
    const [publisher, setPublisher] = useState(edt_nome);
    const [genre, setGenre] = useState(generos);
    const [imageSrc, setImageSrc] = useState(liv_foto_capa);

    const handleImageChange = (imageURL) => {
        setImageSrc(imageURL);
    };

    const handleSave = () => {
        // Aqui você pode implementar a lógica para salvar os dados em algum backend ou estado global

        // Exemplo de redirecionamento para a tela de informações do livro
        router.push('/infoLivroBiblioteca');
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Editar informações do livro</h1>
                <div className={styles.container}>
                    <div className={styles.lineSquare}>
                        <div className={styles.inputContainer}>
                            <div className={styles.infoBookReserva}>
                                <div className={styles.imgBook}>
                                    <div className={styles.imagePreview}>
                                        <Image
                                            src={imageSrc}
                                            alt={title}
                                            width={667}
                                            height={1000}
                                            className={styles.imgReserva}
                                        />
                                    </div>
                                    {isEditing && (
                                        <FileInput onFileSelect={handleImageChange} />
                                    )}
                                </div>
                                <div className={styles.livroInfo}>
                                    <div className={styles.headerLineSquare}>
                                        <div className={styles.title}>
                                            <p className={styles.geral}>Visão geral</p>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    className={`${styles.editInputTittle} ${styles.editInput}`}
                                                />
                                            ) : (
                                                <p className={styles.livro}>{title}</p>
                                            )}
                                        </div>
                                        <div className={styles.smallLineSquare}>
                                            <div className={styles.quantidade}>
                                                <span className={styles.disponivel}>Disponíveis</span>
                                                {isEditing ? (
                                                    <input
                                                        type="number"
                                                        value={availableQuantity}
                                                        onChange={(e) => setAvailableQuantity(Number(e.target.value))}
                                                        className={`${styles.editInputQuant} ${styles.editInput}`}
                                                    />
                                                ) : (
                                                    <span className={styles.quant}>{availableQuantity}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isEditing ? (
                                        <textarea
                                            value={summary}
                                            onChange={(e) => setSummary(e.target.value)}
                                            className={styles.inputResumo}
                                        />
                                    ) : (
                                        <p className={styles.resumo}>{summary}</p>
                                    )}
                                    
                                </div>
                            </div>
                            <div className={styles.infoContainer}>
                                        <div className={styles.infoBox}>
                                            <span className={styles.titleSuperior}>Autor(a)</span>
                                            <Image
                                                src="/Icons TCC/autor.png"
                                                alt="Autor"
                                                width={1080}
                                                height={980}
                                                className={styles.imgIcons}
                                            />
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={author}
                                                    onChange={(e) => setAuthor(e.target.value)}
                                                    className={`${styles.editInputIcons} ${styles.editInput}`}
                                                />
                                            ) : (
                                                <span className={styles.titleInferior}>{author}</span>
                                            )}
                                        </div>
                                        <div className={styles.infoBox}>
                                            <span className={styles.titleSuperior}>Editora</span>
                                            <Image
                                                src="/Icons TCC/editora.png"
                                                alt="Editora"
                                                width={1080}
                                                height={980}
                                                className={styles.imgIcons}
                                            />
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={publisher}
                                                    onChange={(e) => setPublisher(e.target.value)}
                                                    className={`${styles.editInputIcons} ${styles.editInput}`}
                                                />
                                            ) : (
                                                <span className={styles.titleInferior}>{publisher}</span>
                                            )}
                                        </div>
                                        <div className={styles.infoBox}>
                                            <span className={styles.titleSuperior}>Gênero</span>
                                            <Image
                                                src="/Icons TCC/genero.png"
                                                alt="Gênero"
                                                width={1080}
                                                height={980}
                                                className={styles.imgIcons}
                                            />
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={genre}
                                                    onChange={(e) => setGenre(e.target.value)}
                                                    className={`${styles.editInputIcons} ${styles.editInput}`}
                                                />
                                            ) : (
                                                <span className={styles.titleInferior}>{genre}</span>
                                            )}
                                        </div>
                                    </div>
                        </div>
                    </div>
                    {isEditing && (
                        <button onClick={handleSave} className={styles.saveButton}>
                            Salvar
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}
