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

    const [perfil, setPerfil] = useState([]); // Inicializa como um array vazio
    const [carregando, setCarregando] = useState(true); // Estado de carregamento
    // const [error, setError] = useState(null);

    useEffect(() => {
        carregaPerfil();
    }, []);

    async function carregaPerfil() {
        const params = { usu_cod: 18 };

        try {
            const response = await api.get('/usuarios', { params }); // Corrigido para passar como objeto
            console.log(response.data);
            setPerfil(response.data.dados); // Corrigido para acessar os dados corretamente
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        } finally {
            setCarregando(false); // Define carregando como falso após a tentativa de carregamento
        }
    }

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <div className={styles.contentWrapper}>
                    <h1 className={styles.perfil}>Perfil</h1>
                    {carregando ? (
                        <p>Carregando...</p> // Mensagem de carregamento
                    ) : perfil.length > 0 ? (
                        perfil.map(infoUsu => (
                            <div key={infoUsu.cod_usu} className={styles.parentContainer}>
                                <div className={styles.PIContainer}>
                                    <div className={styles.profileContainer}>
                                        <div className={styles.imgContainer}>
                                            <Image
                                                src={infoUsu.usu_foto}
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
                                            <p>{infoUsu.usu_rm}</p>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.textInput}>Nome social:</label>
                                            <p>{infoUsu.usu_nome}</p>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.textInput}>Nome completo:</label>
                                            <p>{infoUsu.usu_nome_completo}</p>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.textInput}>E-mail:</label>
                                            <p>{infoUsu.usu_email}</p>
                                        </div>
                                        <form className={styles.sexoForm}>
                                            <legend>Sexo:</legend>
                                            {[
                                                { label: 'Feminino', value: '0' },
                                                { label: 'Masculino', value: '1' },
                                                { label: 'Neutro', value: '2' },
                                                { label: 'Padrão', value: '3' }
                                            ].map((opcao) => (
                                                <label key={opcao.value}>
                                                    <input
                                                        type="radio"
                                                        name="usu_sexo"
                                                        value={opcao.value}
                                                        checked={infoUsu.usu_sexo === opcao.value}
                                                        disabled
                                                    />
                                                    {opcao.label.charAt(0).toUpperCase() + opcao.label.slice(1)}
                                                </label>
                                            ))}
                                        </form>
                                    </div>
                                </div>
                                <div className={styles.editar}>
                                    <Link href={`/perfil/${infoUsu.cod_usu}`}>
                                        <button className={styles.editarButton}>
                                            <Image
                                                src="/imagens_telas/editar_perfil.png"
                                                width={500}
                                                height={500}
                                                alt="Editar perfil"
                                            />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 className={styles.aviso}>Não há resultados para a requisição</h1>
                    )}
                    <div className={styles.redefinir}>
                        <Link href="/usuarios/esqueceuSenha1">Esqueceu a senha?</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
