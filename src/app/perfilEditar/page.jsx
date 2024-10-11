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
    const [cursos, setCursos] = useState([]);

    const [perfilEdt, setPerfilEdt] = useState({
        "usu_cod": '',
        "usu_rm": '',
        "usu_social": '',
        "usu_nome": '',
        "usu_email": '',
        "usu_senha": '',
        "usu_sexo": '',
        "usu_foto": '',
        "usu_ativo": '',
        "cur_cod" : '',
        "cur_nome" : '',
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

    useEffect(() => {
        listaCursos();
    }, []);

    async function listaCursos() {
        try {
            const response = await api.post('/cursos');
            setCursos(response.data.dados);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    // Busca os dados do perfil ao montar o componente
    useEffect(() => {
        const handleCarregaPerfil = async () => {
            const dados = { usu_cod: codUsu }

            try {
                const response = await api.post('/usuarios', dados); // Ajuste o endpoint conforme necessário
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
    }, []);

    const handleImageChange = (imageURL) => {
        setImageSrc(imageURL);
        setPerfilEdt((prev) => ({ ...prev, usu_foto: imageURL }));
    };

    const handleSave = async () => {
        const { usu_rm, usu_nome, usu_nome_completo, usu_email, cur_nome, usu_sexo } = perfilEdt;

        if (!usu_rm || !usu_nome || !usu_nome_completo || !usu_email || !cur_nome || !usu_sexo) {
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
    // console.log(livro);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfilEdt(prev => ({ ...prev, [name]: value }));
    }    

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
                                        name="usu_rm"
                                        onChange={handleChange}
                                        className={`${styles.inputField} ${styles.inputRm}`}
                                        aria-label="Registro de matrícula"
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <p className={styles.textInput}>Nome social:</p>
                                    <input
                                        type="text"
                                        name="usu_social"
                                        onChange={handleChange}
                                        className={styles.inputField}
                                        aria-label="Nome Social"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <p className={styles.textInput}>Nome completo:</p>
                                    <input
                                        type="text"
                                        name="usu_nome"
                                        onChange={handleChange}
                                        className={styles.inputField}
                                        aria-label="Nome Completo"
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.textInput}>E-mail:</label>
                                    <input
                                        type="email"
                                        name="usu_email"
                                        onChange={handleChange}
                                        className={styles.inputField}
                                        aria-label="E-mail"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                <label className={styles.textInput}>Curso médio ou técnico:</label>
                                    <select id="cur_cod" name="cur_cod" defaultValue={perfilEdt.cur_cod} onChange={handleChange} className={styles.opcao}>
                                        <option value="0" style={{ color: '#999' }}>{cur_nome}</option>
                                        {
                                            cursos.map(cur => (
                                                <option key={cur.cur_cod} value={cur.cur_cod}>{cur.cur_nome}</option>
                                            ))
                                        }
                                    </select>
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
                                                checked={perfilEdt.usu_sexo === opcao.value}
                                                onChange={handleChange}
                                            />
                                            {opcao.label.charAt(0).toUpperCase() + opcao.label.slice(1)}
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
                    type="submit"
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
