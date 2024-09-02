import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function InfoLivroRecomendacao() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className="informacoes">Informações do livro</h1>
                <div className="container">
                    <div className="lineSquare">
                        <div className="input-container">
                            <div className="info-book-reserva">
                                <Image 
                                    src="/Capa_dos_livros/o_diario_de_anne_frank.jpg" 
                                    alt="O Diário de Anne Frank" 
                                    className="img-reserva" 
                                    width={300} 
                                    height={450} 
                                />
                                <div className="livro-info">
                                    <div className="header-lineSquare">
                                        <div className="title">
                                            <p className="geral">Visão geral</p>
                                            <p className="livro">O Diário de Anne Frank</p>
                                        </div>
                                        <div className="smallLineSquare">
                                            <div className="text">
                                                <span className="disponivel">Disponíveis</span>
                                                <span className="quant">5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="resumo">
                                        O Diário de Anne Frank é um livro que relata a história de uma jovem judia chamada Anne Frank, que viveu durante a Segunda Guerra Mundial
                                        e se escondeu com sua família e outros judeus em um anexo secreto em Amsterdã, nos Países Baixos, para escapar da perseguição nazista.
                                    </p>
                                    <div className="info-container">
                                        <div className="info-box">
                                            <span className="title-superior">Autor(a)</span>
                                            <Image 
                                                src="/Icons TCC/autora.png" 
                                                className="img-icons" 
                                                alt="Autor(a)" 
                                                width={20} 
                                                height={20} 
                                            />
                                            <span className="title-inferior">Anne Frank</span>
                                        </div>
                                        <div className="info-box">
                                            <span className="title-superior">Editora</span>
                                            <Image 
                                                src="/Icons TCC/editora.png" 
                                                className="img-icons" 
                                                alt="Editora" 
                                                width={20} 
                                                height={20} 
                                            />
                                            <span className="title-inferior">Grupo Editorial Record</span>
                                        </div>
                                        <div className="info-box">
                                            <span className="title-superior">Gênero</span>
                                            <Image 
                                                src="/Icons TCC/genero.png" 
                                                className="img-icons" 
                                                alt="Gênero" 
                                                width={20} 
                                                height={20} 
                                            />
                                            <span className="title-inferior">Autobiográfico</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="line"></div>
                            <p className="desc-prof">Descrição do professor:</p>
                            <p className="desc-prof-curso">Técnico em Recursos Humanos</p>
                            <p className="desc-prof">Recomendado para:</p>
                            <form className="modulo-form">
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
                <div className="editar">
                    <Link href="/reservarLivro/">
                        <span className="reserv-button">Reservar livro</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
