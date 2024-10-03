"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import FileInput from "@/componentes/FileInput/page";
import ModalConfirmar from '@/componentes/modalConfirmar/page';
import api from '@/services/api';

export default function PerfilEditar({ codUsu }) {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };

    const router = useRouter();
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(null);
    const [perfilEdt, setPerfilEdt] = useState({
        "usu_cod": "",
        "usu_rm": "",
        "usu_nome": "",
        "usu_email": "",
        "usu_senha": "",
        "usu_sexo": "",
        "usu_foto": "",
        "usu_ativo": 0,
    });

    const handleFileSelect = (imageUrl) => {
        setProfileImage(imageUrl);
    };

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [imageSrc, setImageSrc] = useState(perfilEdt.liv_foto_capa || '');

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = async () => {
        closeModalConfirm();
        await handleSave();
    };

    // Busca os dados do perfil ao montar o componente
    useEffect(() => {
        const handleCarregaPerfil = async () => {
            const dadosApi = { usu_cod: codUsu }

            try {
                const response = await api.post('/usuarios'); // Ajuste o endpoint conforme necessário
                if (response.data.sucesso) {
                    const edtPerfilApi = response.data.dados[0];
                    setPerfilEdt(edtPerfilApi);
                } else {
                    setError(response.data.mensagem);
                }
            } catch (error) {
                setError(error.response ? error.response.data.mensagem : 'Erro no front-end');
            }
        };

        handleCarregaPerfil();
    }, [codUsu]);

    const handleImageChange = (imageURL) => {
        setImageSrc(imageURL);
        setPerfilEdt((prev) => ({ ...prev, usu_foto: imageURL }));
    };

    const handleSave = async () => {
        const { usu_rm, usu_nome, usu_nome_completo, usu_email, usu_sexo } = perfilEdt;

        if (!usu_rm || !usu_nome || !usu_nome_completo || !usu_email || !usu_sexo) {
            alert('Todos os campos devem ser preenchidos');
            return;
        }

        setIsSaving(true); // Inicia o salvamento

        try {
            const response = await api.patch(`/usuarios/${perfilEdt.usu_cod}`, {
                ...perfilEdt,
                usu_foto: imageSrc,
            });

            if (response.data.sucesso) {
                alert('Usuário atualizado com sucesso!');
                router.push('/perfil'); // Redireciona após o sucesso
            }
        } catch (error) {
            console.error("Erro ao salvar informações do usuário:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao salvar informações. Tente novamente.');
        } finally {
            setIsSaving(false); // Finaliza o salvamento
        }
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.perfil}>Perfil</h1>
                {perfilEdt ? (
                    <div className={styles.parentContainer}>
                        <div className={styles.PIContainer}>
                            <div className={styles.profileContainer}>
                                <div className={styles.imgContainer}>
                                    <Image
                                        src={imageSrc || perfilEdt.usu_foto}
                                        alt="Foto de perfil"
                                        width={512}
                                        height={512}
                                        loader={imageLoader}
                                        priority
                                    />
                                </div>
                                <FileInput onFileSelect={handleImageChange} />
                            </div>

                            <div className={styles.inputContainer}>
                                <div className={styles.inputGroup}>
                                    <p className={styles.textInput}>RM:</p>
                                    <input
                                        type="number"
                                        id="rm"
                                        value={perfilEdt.usu_rm}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            setPerfilEdt({ ...perfilEdt, usu_rm: isNaN(value) ? 0 : value });
                                        }}
                                        className={`${styles.inputField} ${styles.inputRm}`}
                                        aria-label="Registro de matrícula"
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <p className={styles.textInput}>Nome social:</p>
                                    <input
                                        type="text"
                                        id="nomeSocial"
                                        value={perfilEdt.usu_nome}
                                        onChange={(e) => setPerfilEdt({ ...perfilEdt, usu_nome: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Nome Social"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <p className={styles.textInput}>Nome completo:</p>
                                    <input
                                        type="text"
                                        id="nomeCompleto"
                                        value={perfilEdt.usu_nome_completo}
                                        onChange={(e) => setPerfilEdt({ ...perfilEdt, usu_nome_completo: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Nome Completo"
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.textInput}>E-mail:</label>
                                    <input
                                        type="email"
                                        id="usu_email"
                                        value={perfilEdt.usu_email}
                                        onChange={(e) => setPerfilEdt({ ...PerfilEditar, usu_email: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="E-mail"
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
                                                onChange={(e) => setPerfilEdt({ ...perfilEdt, usu_sexo: e.target.value })}
                                            />
                                            {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
                                        </label>
                                    ))}
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>Não há resultados para a requisição</h1>
                )}
            </div>
            <div className={styles.editar}>
                <button
                    type="button"
                    onClick={openModalConfirm}
                    className={styles.saveButton}
                >
                    {isSaving ? 'Salvando...' : 'Salvar alterações'}
                </button>
            </div>
            <ModalConfirmar
                show={showModalConfirm}
                onClose={closeModalConfirm}
                onConfirm={handleConfirm}
            />
        </main >
    );
}
