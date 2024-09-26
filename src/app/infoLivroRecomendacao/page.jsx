"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import api from '@/services/api';

// const infoLivros = {
//     aut_nome: 'Anne Frank',
//     liv_nome: 'O Diário de Anne Frank',
//     liv_foto_capa: '/Capa_dos_livros/o_diario_de_anne_frank.jpg',
//     liv_desc: 'O Diário de Anne Frank, O emocionante relato que se tornou um dos livros mais lidos do mundo.\nO diário de Anne Frank foi publicado pela primeira vez em 1947 e faz parte do cânone literário do Holocausto. E agora, pela primeira vez, vem à luz esta edição em quadrinhos. O roteirista e diretor cinematográfico Ari Folman e o ilustrador David Polonsky demonstram com essa adaptação a dimensão e a genialidade literárias da jovem autora. Eles tornam visual o contemporâneo documento histórico de Anne Frank e traduzem o contexto da época no qual foi escrito. Baseada na edição definitiva do diário, autorizada por Otto Frank, pai de Anne – um dos livros mais vendidos do mundo, publicado no Brasil pela Editora Record , esta versão em quadrinhos torna tangível o destino dos oito habitantes do Anexo durante seus dias no esconderijo.',
//     edt_nome: 'Record',
//     generos: 'Autobiográfico',
// };

function LivroRec({ codLivroRec }) {

    const modulo1 = true; 
    const modulo2 = false; 
    
    const [livroRec, setLivroRec] = useState({
        "rcm_cod": "",
        "cur_nome": "",
        "cur_cod": "",
        "liv_cod": "",
        "liv_foto_capa": "",
        "liv_nome": "",
        "liv_desc": "",
        "aut_nome": "",
        "gen_nome": "",
        "edt_nome": "",
        "disponivel": "",        
    });

    const router = useRouter();

    useEffect(() => {

        handleCarregaLivroRec();

        async function handleCarregaLivroRec() {
            const dadosApi = {
                rcm_cod: codLivroRec // ou qualquer nome correto que a API espera
            };
            
            try {
                const response = await api.post('/rec_listar', dadosApi);
                const confirmaAcesso = response.data.sucesso;
                if (confirmaAcesso) {
                    const livroApi = response.data.dados[0];
                    if (response.data.dados.length > 0) {
                        setLivroRec(livroApi);
                    }
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.mensagem + '\n' + error.response.data.dados);
                } else {
                    alert('Erro no front-end' + '\n' + error);
                }
            }
        }

        // const [infoLivros, setInfoLivros] = useState([]);
        // const router = useRouter();

    }, []);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };

    // export default function InfoLivroRecomendacao() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Informações do livro</h1>
                <div className={styles.container}>
                    {
                        livroRec.rcm_cod !== '' ?
                            <>
                                <div className={styles.lineSquare}>
                                    <div className={styles.inputContainer}>
                                        <div className={styles.infoBookReserva}>
                                            <Image
                                                loader={imageLoader}
                                                src={livroRec.liv_foto_capa}
                                                alt={livroRec.liv_nome}
                                                width={667}
                                                height={1000}
                                                className={styles.imgReserva}
                                            />
                                            <div className={styles.livroInfo}>
                                                <div className={styles.headerLineSquare}>
                                                    <div className={styles.title}>
                                                        <p className={styles.geral}>Visão geral</p>
                                                        <p className={styles.livro}>{livroRec.liv_nome}</p>
                                                    </div>
                                                    <div className={styles.smallLineSquare}>
                                                        <div className={styles.text}>
                                                            <span className={styles.disponivel}>Disponíveis</span>
                                                            <span className={styles.quant}>{livroRec.disponivel}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className={styles.resumo}>{livroRec.liv_desc}</p>
                                            </div>
                                        </div>
                                        <div className={styles.infoContainer}>
                                            <div className={styles.infoBox}>
                                                <span className={styles.titleSuperior}>Autor(a)</span>
                                                <Image
                                                    src="/Icons TCC/autor.png"
                                                    alt="Autor(a)"
                                                    width={1080}
                                                    height={980}
                                                    className={styles.imgIcons}
                                                />
                                                <span className={styles.titleInferior}>{livroRec.aut_nome}</span>
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
                                                <span className={styles.titleInferior}>{livroRec.edt_nome}</span>
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
                                                <span className={styles.titleInferior}>{livroRec.generos}</span>
                                            </div>
                                        </div>
                                        <div className={styles.line}></div>
                                        <p className={styles.descProf}>Recomendado para:</p>
                                        <p className={styles.descProfCurso}>{livroRec.cur_nome}</p>
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
                                                    checked={modulo1 ? true : false}
                                                />
                                                3º Módulo
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="opcao"
                                                    value="4º modulo"
                                                    checked={modulo1 ? true : false}
                                                />
                                                4º Módulo
                                            </label>
                                        </form>
                                    </div>
                                </div>
                                <div className={styles.editar}>
                                    <Link href="/reservarLivro">
                                        <span className={styles.reservButton}>Reservar livro</span>
                                    </Link>
                                </div>
                            </>
                            :
                            <h1>Não há resultados para a requisição</h1>
                    }
                </div>
            </div>
        </main>
    );
}

export default LivroRec;