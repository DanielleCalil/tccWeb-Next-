"use client"
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useState, useEffect} from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import FileInput from "@/componentes/FileInput/page";
import ModalConfirmar from '@/componentes/modalConfirmar/page';
import api from '@/services/api';

export default function PerfilEditar() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };

    const [perfilEdt, setPerfilEdt] = useState({
        "usu_cod": "",
        "usu_rm": "",
        "usu_nome": "",
        "usu_email": "",
        "usu_senha": "",
        "usu_sexo": "",
        "usu_foto": "",
        "usu_ativo": "1",
    });

    const [profileImage, setProfileImage] = useState('/Icons TCC/perfil.jpg'); // Imagem padrão

    const handleFileSelect = (imageUrl) => {
        setProfileImage(imageUrl);
    };

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const router = useRouter();

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = () => {
        setShowModalConfirm(false); // Fecha o modal
        router.push('../perfil');
    };

    // Busca os dados do perfil ao montar o componente
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.patch('/usuarios'); // Ajuste o endpoint conforme necessário
                setPerfilEdt(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados do perfil:", error);
            }
        };

        fetchProfile();
    }, []);


    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.perfil}>Perfil</h1>
                <div className={styles.parentContainer}>
                    <div className={styles.PIContainer}>
                        <div className={styles.profileContainer}>
                            <div className={styles.imgContainer}>
                                <Image
                                    src={perfilEdt.usu_foto || "/Icons TCC/perfil.jpg"}
                                    alt="Foto de perfil"
                                    width={512}
                                    height={512}
                                />
                            </div>
                            <FileInput onFileSelect={handleFileSelect} />
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>RM:</p>
                                <input
                                    id="rm"
                                    type="number"
                                    className={`${styles.inputField} ${styles.inputRm}`}
                                    value={perfilEdt.usu_rm}
                                    disabled
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Nome social:</p>
                                <input
                                    id="nomeSocial"
                                    type="text"
                                    className={styles.inputField}
                                    value={perfilEdt.usu_nome}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Nome completo:</p>
                                <input
                                    id="nomeCompleto"
                                    type="text"
                                    className={styles.inputField}
                                    value={perfilEdt.usu_nome_completo}
                                    disabled
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.textInput}>E-mail:</label>
                                <input
                                    id="email"
                                    type="email"
                                    className={styles.inputField}
                                    value={perfilEdt.usu_email}
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
                                            checked={perfilEdt.usu_sexo === opcao}
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
                    <button
                        type="submit"
                        onClick={openModalConfirm}
                        className={styles.saveButton}
                    >
                        Salvar
                    </button>
                </div>
            </div>
            <ModalConfirmar
                show={showModalConfirm}
                onClose={closeModalConfirm}
                onConfirm={handleConfirm}
            />
        </main>
    );
}
