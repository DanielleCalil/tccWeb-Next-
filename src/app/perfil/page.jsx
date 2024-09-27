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

    const [perfil, setPerfil] = useState({
        "usu_cod": "",
        "usu_rm": "", 
        "usu_nome": "", 
        "usu_email": "", 
        "usu_senha": "", 
        "usu_sexo": "",
        "usu_foto": "", 
        "usu_ativo": "1",
    });

    // Busca os dados do perfil ao montar o componente
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/usuarios'); // Ajuste o endpoint conforme necessário
                setPerfil(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados do perfil:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <div className={styles.contentWrapper}>
                    <h1 className={styles.perfil}>Perfil</h1>
                    <div className={styles.parentContainer}>
                        <div className={styles.PIContainer}>
                            <div className={styles.profileContainer}>
                                <div className={styles.imgContainer}>
                                    <Image
                                        src={perfil.usu_foto || "/Icons TCC/perfil.jpg"}
                                        alt="Foto de perfil padrão"
                                        width={512}
                                        height={512}
                                        loader={imageLoader} // Usa o carregador de imagem personalizado
                                    />
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="rm" className={styles.textInput}>RM:</label>
                                    <input
                                        id="rm"
                                        type="number"
                                        className={styles.inputField}
                                        value={perfil.usu_rm}
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="nomeSocial" className={styles.textInput}>Nome social:</label>
                                    <input
                                        id="nomeSocial"
                                        type="text"
                                        className={styles.inputField}
                                        value={perfil.usu_nome}
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="nomeCompleto" className={styles.textInput}>Nome completo:</label>
                                    <input
                                        id="nomeCompleto"
                                        type="text"
                                        className={styles.inputField}
                                        value={perfil.usu_nome_completo}
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="email" className={styles.textInput}>E-mail:</label>
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
                    </div>
                    <div className={styles.redefinir}>
                        <Link href="/usuarios/esqueceuSenha1">Esqueceu a senha?</Link>
                    </div>
                    <div className={styles.editar}>
                        <Link href="/perfilEditar">
                            <button
                                type="submit"
                                className={styles.editarButton}
                            >
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
