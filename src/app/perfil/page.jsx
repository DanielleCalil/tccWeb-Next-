"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import api from '@/services/api';

export default function Perfil() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };

    const router = useRouter();

    const [perfil, setPerfil] = useState(null);
    const [error, setError] = useState(null);

    // Busca os dados do perfil ao montar o componente
    useEffect(() => {
        const handleCarregaPerfil = async () => {
            const dadosApi = { usu_cod: 18 };

            try {
                const response = await api.post('/usuarios', dadosApi);
                if (response.data.sucesso) {
                    const usuApi = response.data.dados[0];
                    setPerfil(usuApi);
                } else {
                    setError(response.data.mensagem);
                }
            } catch (error) {
                setError(error.response ? error.response.data.mensagem : "Erro no front-end");
            }
        };

        handleCarregaPerfil();
    }, []);

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <div className={styles.contentWrapper}>
                    <h1 className={styles.perfil}>Perfil</h1>
                    {perfil ? (
                        <>
                            <div className={styles.parentContainer}>
                                <Link href={`/perfil/${perfil?.usu_cod}`}>
                                    <div className={styles.PIContainer}>
                                        <div className={styles.profileContainer}>
                                            <div className={styles.imgContainer}>
                                                <Image
                                                    src={perfil.usu_foto}
                                                    alt="Foto de perfil"
                                                    width={512}
                                                    height={512}
                                                    loader={imageLoader}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.inputContainer}>
                                            <div className={styles.inputGroup}>
                                                <label className={styles.textInput}>RM:</label>
                                                <p>{perfil.usu_rm}</p>
                                                <input
                                                    id="rm"
                                                    type="number"
                                                    className={styles.inputField}
                                                    value={perfil.usu_rm}
                                                    disabled
                                                />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label className={styles.textInput}>Nome social:</label>
                                                <p>{perfil.usu_nome}</p>
                                                <input
                                                    id="nomeSocial"
                                                    type="text"
                                                    className={styles.inputField}
                                                    value={perfil.usu_nome}
                                                    disabled
                                                />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label className={styles.textInput}>Nome completo:</label>
                                                <p>{perfil.usu_nome_completo}</p>
                                                <input
                                                    id="nomeCompleto"
                                                    type="text"
                                                    className={styles.inputField}
                                                    value={perfil.usu_nome_completo}
                                                    disabled
                                                />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label className={styles.textInput}>E-mail:</label>
                                                <p>{perfil.usu_email}</p>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className={styles.inputField}
                                                    value={perfil.usu_email}
                                                    disabled
                                                />
                                            </div>
                                            <form className={styles.sexoForm}>
                                                <legend>Sexo:</legend>
                                                {["feminino", "masculino", "neutro", "padrao"].map((opcao) => (
                                                    <label key={opcao}>
                                                        <input
                                                            type="radio"
                                                            name="opcao"
                                                            value={opcao}
                                                            checked={perfil.usu_sexo === opcao}
                                                            disabled
                                                        />
                                                        {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
                                                    </label>
                                                ))}
                                            </form>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <h1 className={styles.aviso}>Não há resultados para a requisição</h1>
                    )}
                    <div className={styles.redefinir}>
                        <Link href="/usuarios/esqueceuSenha1">Esqueceu a senha?</Link>
                    </div>
                    <div className={styles.editar}>
                        <Link href="/perfilEditar">
                            <button className={styles.editarButton}>
                                <Image
                                    src="/imagens_telas/editar_perfil.png"
                                    width={500}
                                    height={500}
                                />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
