import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function InfoLivroRecomendacao() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Informações do livro</h1>
                <div className={styles.container}>
                    <div className={styles.lineSquare}>
                        <div className={styles.inputContainer}>
                            <div className={styles.infoBookReserva}>
                                <Image 
                                    src="/Capa_dos_livros/o_diario_de_anne_frank.jpg" 
                                    alt="O Diário de Anne Frank" 
                                    className={styles.imgReserva} 
                                    width={667} 
                                    height={1000} 
                                />
                                <div className={styles.livroInfo}>
                                    <div className={styles.headerLineSquare}>
                                        <div className={styles.title}>
                                            <p className={styles.geral}>Visão geral</p>
                                            <p className={styles.livro}>O Diário de Anne Frank</p>
                                        </div>
                                        <div className={styles.smallLineSquare}>
                                            <div className={styles.text}>
                                                <span className={styles.disponivel}>Disponíveis</span>
                                                <span className={styles.quant}>5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.resumo}>
                                        O Diário de Anne Frank é um livro que relata a história de uma jovem judia chamada Anne Frank, que viveu durante a Segunda Guerra Mundial
                                        e se escondeu com sua família e outros judeus em um anexo secreto em Amsterdã, nos Países Baixos, para escapar da perseguição nazista.
                                    </p>
                                    <div className={styles.infoContainer}>
                                        <div className={styles.infoBox}>
                                            <span className={styles.titleSuperior}>Autor(a)</span>
                                            <Image 
                                                src="/Icons TCC/autor.png" 
                                                className={styles.imgIcons} 
                                                alt="Autor(a)" 
                                                width={1080} 
                                                height={980} 
                                            />
                                            <span className={styles.titleInferior}>Anne Frank</span>
                                        </div>
                                        <div className={styles.infoBox}>
                                            <span className={styles.titleSuperior}>Editora</span>
                                            <Image 
                                                src="/Icons TCC/editora.png" 
                                                className={styles.imgIcons} 
                                                alt="Editora" 
                                                width={1080} 
                                                height={980} 
                                            />
                                            <span className={styles.titleInferior}>Grupo Editorial Record</span>
                                        </div>
                                        <div className={styles.infoBox}>
                                            <span className={styles.titleSuperior}>Gênero</span>
                                            <Image 
                                                src="/Icons TCC/genero.png" 
                                                className={styles.imgIcons} 
                                                alt="Gênero" 
                                                width={1080} 
                                                height={980} 
                                            />
                                            <span className={styles.titleInferior}>Autobiográfico</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.line}></div>
                            <p className={styles.descProf}>Descrição do professor:</p>
                            <p className={styles.descProfCurso}>Técnico em Recursos Humanos</p>
                            <p className={styles.descProf}>Recomendado para:</p>
                            <form className={styles.moduloForm}>
                                <label>
                                    <input
                                        type="radio"
                                        name="opcao"
                                        value="1º modulo"
                                    />
                                    1º Módulo
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="opcao"
                                        value="2º modulo"
                                    />
                                    2º Módulo
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="opcao"
                                        value="3º modulo"
                                    />
                                    3º Módulo
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="opcao"
                                        value="4º modulo"
                                    />
                                    4º Módulo
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.editar}>
                    <Link href="/reservarLivro/">
                        <span className={styles.reservButton}>Reservar livro</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
