import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

const infoLivros = {
    aut_nome: 'Anne Frank',
    liv_nome: 'O Diário de Anne Frank',
    liv_foto_capa: '/Capa_dos_livros/o_diario_de_anne_frank.jpg',
    liv_desc: 'O Diário de Anne Frank, O emocionante relato que se tornou um dos livros mais lidos do mundo.\nO diário de Anne Frank foi publicado pela primeira vez em 1947 e faz parte do cânone literário do Holocausto. E agora, pela primeira vez, vem à luz esta edição em quadrinhos. O roteirista e diretor cinematográfico Ari Folman e o ilustrador David Polonsky demonstram com essa adaptação a dimensão e a genialidade literárias da jovem autora. Eles tornam visual o contemporâneo documento histórico de Anne Frank e traduzem o contexto da época no qual foi escrito. Baseada na edição definitiva do diário, autorizada por Otto Frank, pai de Anne – um dos livros mais vendidos do mundo, publicado no Brasil pela Editora Record , esta versão em quadrinhos torna tangível o destino dos oito habitantes do Anexo durante seus dias no esconderijo.',
    edt_nome: 'Record',
    generos: 'Autobiográfico',
};

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
                                    src={infoLivros.liv_foto_capa}
                                    alt={infoLivros.liv_nome}
                                    className={styles.imgReserva}
                                    width={667}
                                    height={1000}
                                />
                                <div className={styles.livroInfo}>
                                    <div className={styles.headerLineSquare}>
                                        <div className={styles.title}>
                                            <p className={styles.geral}>Visão geral</p>
                                            <p className={styles.livro}>{infoLivros.liv_nome}</p>
                                        </div>
                                        <div className={styles.smallLineSquare}>
                                            <div className={styles.text}>
                                                <span className={styles.disponivel}>Disponíveis</span>
                                                <span className={styles.quant}>5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.resumo}>{infoLivros.liv_desc}</p>
                                </div>
                            </div>
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
                                    <span className={styles.titleInferior}>{infoLivros.aut_nome}</span>
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
                                    <span className={styles.titleInferior}>{infoLivros.edt_nome}</span>
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
                                    <span className={styles.titleInferior}>{infoLivros.generos}</span>
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
                    <Link href="/reservarLivro">
                        <span className={styles.reservButton}>Reservar livro</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
