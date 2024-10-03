"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { IoPencilSharp } from "react-icons/io5";
import api from '@/services/api';

export default function InfoLivroBiblioteca({ codLivro }) {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };

    const [livro, setLivro] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const handleCarregaLivro = async () => {
            const dadosApi = { liv_cod: codLivro };

            try {
                const response = await api.post('/livros', dadosApi);
                if (response.data.sucesso) {
                    const livroApi = response.data.dados[0];
                    setLivro(livroApi);
                } else {
                    setError(response.data.mensagem);
                }
            } catch (error) {
                setError(error.response ? error.response.data.mensagem : 'Erro no front-end');
            }
        };

        handleCarregaLivro();
    }, [codLivro]);

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Informações do livro</h1>
                <div className={styles.contButton}>
                    <Link href={`/infoLivroBiblioteca/${livro?.liv_cod}`}>
                        <button className={styles.ButtonEditar}>
                            <IoPencilSharp className={styles.tpiconEditar} />
                            Editar
                        </button>
                    </Link>
                </div>
                <div className={styles.container}>
                    {livro ? (
                        <>
                            <div className={styles.lineSquare}>
                                <div className={styles.inputContainer}>
                                    <div className={styles.infoBookReserva}>
                                        <Image
                                            loader={imageLoader}
                                            src={livro.liv_foto_capa}
                                            alt={livro.liv_nome}
                                            width={667}
                                            height={1000}
                                            className={styles.imgReserva}
                                        />
                                        <div className={styles.livroInfo}>
                                            <div className={styles.headerLineSquare}>
                                                <div className={styles.title}>
                                                    <p className={styles.geral}>Visão geral</p>
                                                    <p className={styles.livro}>{livro.liv_nome}</p>
                                                </div>
                                                <div className={styles.smallLineSquare}>
                                                    <div className={styles.text}>
                                                        <span className={styles.disponivel}>Disponíveis</span>
                                                        <span className={styles.quant}>{livro.disponivel}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className={styles.resumo}>{livro.liv_desc}</p>
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
                                            <span className={styles.titleInferior}>{livro.aut_nome}</span>
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
                                            <span className={styles.titleInferior}>{livro.edt_nome}</span>
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
                                            <span className={styles.titleInferior}>{livro.gen_nome}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.editar}>
                                <Link href="/reservarLivro/">
                                    <button className={styles.reservButton}>Reservar livro</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <h1>Não há resultados para a requisição</h1>
                    )}
                </div>
            </div>
        </main>
    );
}
