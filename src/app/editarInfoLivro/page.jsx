"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import api from '@/services/api';
import FileInput from '@/componentes/FileInput/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page'

export default function EditarInformacoesLivro({ initialData }) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(true);
    const [livro, setLivro] = useState(initialData?.liv_nome || '');
    const [quantidade, setQuantidade] = useState(initialData?.disponivel || '');
    const [resumo, setResumo] = useState(initialData?.liv_desc || '');
    const [autor, setAutor] = useState(initialData?.aut_nome || '');
    const [editora, setEditora] = useState(initialData?.edt_nome || '');
    const [genero, setGenero] = useState(initialData?.generos || '');
    const [imageSrc, setImageSrc] = useState(initialData?.liv_foto_capa || '');

    // Função para buscar os dados do perfil ao montar o componente
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/usuarios');
                setPerfil(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados do perfil:", error);
            }
        };
        fetchProfile();
    }, []);


    const handleSave = async () => {
        if (!livro || !quantidade || !resumo || !autor || !editora || !genero) {
            alert('Todos os campos devem ser preenchidos');
            return;
        }
        try {
            await api.saveBookInfo({ livro, quantidade, resumo, autor, editora, genero, imageSrc });
            router.push('/infoLivroBiblioteca');
        } catch (error) {
            console.error("Erro ao salvar informações do livro:", error);
        }
    };


    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = () => {
        setShowModalConfirm(false); // Fecha o modal
        router.push('../biblioteca');
    };


    const handleImageChange = (imageURL) => {
        setImageSrc(imageURL);
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Editar informações do livro</h1>
                <div className={styles.container}>
                {
                        livro.liv_cod !== '' ?
                            <>
                    <div className={styles.lineSquare}>
                        <div className={styles.inputContainer}>
                            <div className={styles.infoBookReserva}>
                                <div className={styles.imgBook}>
                                    <div className={styles.imagePreview}>
                                        <Image
                                            src={imageSrc}
                                            alt={livro}
                                            width={667}
                                            height={1000}
                                            className={styles.imgReserva}
                                        />
                                    </div>
                                    {isEditing && (
                                        <FileInput onFileSelect={handleImageChange} />
                                    )}
                                </div>
                                <div className={styles.livroInfo}>
                                    <div className={styles.headerLineSquare}>
                                        <div className={styles.title}>
                                            <p className={styles.geral}>Visão geral</p>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={livro}
                                                    onChange={(e) => setLivro(e.target.value)}
                                                    className={`${styles.editInputTittle} ${styles.editInput}`}
                                                />
                                            ) : (
                                                <p className={styles.livro}>{livro}</p>
                                            )}
                                        </div>
                                        <div className={styles.smallLineSquare}>
                                            <div className={styles.quantidade}>
                                                <span className={styles.disponivel}>Disponíveis</span>
                                                {isEditing ? (
                                                    <input
                                                        type="number"
                                                        value={quantidade}
                                                        onChange={(e) => setQuantidade(Number(e.target.value))}
                                                        className={`${styles.editInputQuant} ${styles.editInput}`}
                                                    />
                                                ) : (
                                                    <span className={styles.quant}>{quantidade}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isEditing ? (
                                        <textarea
                                            value={resumo}
                                            onChange={(e) => setResumo(e.target.value)}
                                            className={styles.inputResumo}
                                        />
                                    ) : (
                                        <p className={styles.resumo}>{resumo}</p>
                                    )}
                                    <div className={styles.infoContainer}>
                                        <div className={styles.infoBox}>
                                            <span className={styles.titleSuperior}>Autor(a)</span>
                                            <Image
                                                src="/Icons TCC/autor.png"
                                                alt="Autor"
                                                width={1080}
                                                height={980}
                                                className={styles.imgIcons}
                                            />
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={autor}
                                                    onChange={(e) => setAutor(e.target.value)}
                                                    className={`${styles.editInputIcons} ${styles.editInput}`}
                                                />
                                            ) : (
                                                <span className={styles.titleInferior}>{autor}</span>
                                            )}
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
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editora}
                                                    onChange={(e) => setEditora(e.target.value)}
                                                    className={`${styles.editInputIcons} ${styles.editInput}`}
                                                />
                                            ) : (
                                                <span className={styles.titleInferior}>{editora}</span>
                                            )}
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
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={genero}
                                                    onChange={(e) => setGenero(e.target.value)}
                                                    className={`${styles.editInputIcons} ${styles.editInput}`}
                                                />
                                            ) : (
                                                <span className={styles.titleInferior}>{genero}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.editar}>
                                        <button
                                            type="submit"
                                            onClick={openModalConfirm}
                                            className={styles.saveButton}
                                        >
                                            Salvar Alterações
                                        </button>
                                    </div>
                                    <ModalConfirmar
                                        show={showModalConfirm}
                                        onClose={closeModalConfirm}
                                        onConfirm={handleConfirm}
                                    />
                                </div>
                            </div>
                        </div>
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
