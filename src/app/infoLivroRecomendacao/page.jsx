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

export default function InfoLivroRecomendacao({ codLivroRec }) {

    const [modulo1, setModulo1] = useState(false);
    const [modulo2, setModulo2] = useState(false);
    const [modulo3, setModulo3] = useState(false);
    const [modulo4, setModulo4] = useState(false);

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
        "generos": "",
        "edt_nome": "",
        "disponivel": "",
    });

    const router = useRouter();

    useEffect(() => {

        handleCarregaLivro();

        // Função para carregar os dados do livro
        async function handleCarregaLivro() {
            const dadosApi = {
                liv_cod: codLivroRec
            };
            // console.log("Dados enviados para API:", dadosApi);

            try {
                const response = await api.post('/rec_listar', dadosApi);
                console.log("Resposta da API:", response);
                const confirmaAcesso = response.data.sucesso;
                if (confirmaAcesso) {
                    const livroApi = response.data.dados[0];

                    setModulo1(livroApi.rcm_mod1 === 1);
                    setModulo2(livroApi.rcm_mod2 === 1);
                    setModulo3(livroApi.rcm_mod3 === 1);
                    setModulo4(livroApi.rcm_mod4 === 1);

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
    }, []);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Informações do livro</h1>
                <div className={styles.container}>
                    {livroRec.liv_cod !== '' ?
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
                                            <span className={styles.titleInferior}>{livroRec.gen_nome}</span>
                                        </div>
                                    </div>
                                    <div className={styles.line}></div>
                                    <p className={styles.descProf}>Recomendado para:</p>
                                    <p className={styles.descProfCurso}>{livroRec.cur_nome}</p>
                                    <form className={styles.moduloForm}>
                                        <label className={styles.customCheckbox}>
                                            <input
                                                type="checkbox"
                                                name="modulo1"
                                                value="1º modulo"
                                                checked={modulo1}
                                                onChange={() => setModulo1(!modulo1)}
                                                disabled={true}
                                            />
                                            1º Módulo
                                        </label>
                                        <label className={styles.customCheckbox}>
                                            <input
                                                type="checkbox"
                                                name="modulo2"
                                                value="2º modulo"
                                                checked={modulo2}
                                                onChange={() => setModulo2(!modulo2)}
                                                disabled={true}
                                            />
                                            2º Módulo
                                        </label>
                                        <label className={styles.customCheckbox}>
                                            <input
                                                type="checkbox"
                                                name="modulo3"
                                                value="3º modulo"
                                                checked={modulo3}
                                                onChange={() => setModulo3(!modulo3)}
                                                disabled={true}
                                            />
                                            3º Módulo
                                        </label>
                                        <label className={styles.customCheckbox}>
                                            <input
                                                type="checkbox"
                                                name="modulo4"
                                                value="4º modulo"
                                                checked={modulo4}
                                                onChange={() => setModulo4(!modulo4)}
                                                disabled={true}
                                            />
                                            4º Módulo
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div className={styles.editar}>
                                <Link href="/reservarLivro">
                                    <span>
                                        <button className={styles.reservButton}>Reservar livro</button>
                                    </span>
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