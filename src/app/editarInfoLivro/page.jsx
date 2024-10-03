"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import FileInput from '@/componentes/FileInput/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page';
import api from '@/services/api';

export default function EditarInformacoesLivro({ initialData, codLivro }) {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };
    
    const router = useRouter();
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(null);
    const [livro, setLivro] = useState(initialData || {
        "liv_cod": '',
        "liv_nome": '',
        "disponivel": '',
        "liv_desc": '',
        "aut_nome": '',
        "edt_nome": '',
        "gen_nome": '',
        "liv_foto_capa": '',
        "generos": ''
    });

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [imageSrc, setImageSrc] = useState(initialData?.liv_foto_capa || '');

    
    useEffect(() => {
        console.log("Dados iniciais:", initialData);
        if (!initialData) {
            console.warn("Nenhum dado inicial encontrado.");
        }
    }, [initialData]);

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = async () => {
        closeModalConfirm();
        await handleSave();
    };

    useEffect(() => {
        const handleCarregaLivro = async () => {
            const dadosApi = { liv_cod: codLivro };

            try {
                const response = await api.post('/livros', dadosApi);
                if (response.data.sucesso) {
                    const livroApi = response.data.dados[0];
                    setLivro(livroApi);
                } else {
                    setError(response.data.mensagem);
                }
            } catch (error) {
                setError(error.response ? error.response.data.mensagem : 'Erro no front-end');
            } 
        };

        handleCarregaLivro();
    }, [codLivro]);


    const handleImageChange = (imageURL) => {
        setImageSrc(imageURL);
        setLivro((prev) => ({ ...prev, liv_foto_capa: imageURL }));
    };

    const handleSave = async () => {
        const { liv_nome, disponivel, liv_desc, aut_nome, edt_nome, gen_nome } = livro;

        if (!liv_nome || !disponivel || !liv_desc || !aut_nome || !edt_nome || !gen_nome) {
            alert('Todos os campos devem ser preenchidos');
            return;
        }

        setIsSaving(true); // Inicia o salvamento

        try {
            const response = await api.patch(`/livros/${livro.liv_cod}`, {
                ...livro,
                liv_foto_capa: imageSrc,
            });

            if (response.data.sucesso) {
                alert('Livro atualizado com sucesso!');
                router.push('/infoLivroBiblioteca'); // Redireciona após o sucesso
            }
        } catch (error) {
            console.error("Erro ao salvar informações do livro:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao salvar informações. Tente novamente.');
        } finally {
            setIsSaving(false); // Finaliza o salvamento
        }
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Editar informações do livro</h1>
                <div className={styles.container}>
                    {livro ? (
                        <div className={styles.lineSquare}>
                            <div className={styles.inputContainer}>
                                <div className={styles.infoBookReserva}>
                                    <div className={styles.imgBook}>
                                        <div className={styles.imagePreview}>
                                            <Image
                                                src={imageSrc || livro.liv_foto_capa}
                                                alt={livro.liv_nome}
                                                width={667}
                                                height={1000}
                                                className={styles.imgReserva}
                                                loader={imageLoader}
                                                priority
                                            />
                                        </div>
                                        <FileInput onFileSelect={handleImageChange} />
                                    </div>
                                    <div className={styles.livroInfo}>
                                        <div className={styles.headerLineSquare}>
                                            <div className={styles.title}>
                                                <p className={styles.geral}>Visão geral</p>
                                                <input
                                                    type="text"
                                                    value={livro.liv_nome}
                                                    onChange={(e) => setLivro({ ...livro, liv_nome: e.target.value })}
                                                    className={`${styles.editInputTittle} ${styles.editInput}`}
                                                    aria-label="Nome do livro"
                                                />
                                            </div>
                                            <div className={styles.smallLineSquare}>
                                                <div className={styles.quantidade}>
                                                    <span className={styles.disponivel}>Disponíveis</span>
                                                    <input
                                                        type="number"
                                                        value={livro.disponivel}
                                                        onChange={(e) => {
                                                            const value = Number(e.target.value);
                                                            setLivro({ ...livro, disponivel: isNaN(value) ? 0 : value });
                                                        }}
                                                        className={`${styles.editInputQuant} ${styles.editInput}`}
                                                        aria-label="Quantidade disponível"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <textarea
                                            value={livro.liv_desc}
                                            onChange={(e) => setLivro({ ...livro, liv_desc: e.target.value })}
                                            className={styles.inputResumo}
                                            aria-label="Descrição do livro"
                                        />
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
                                                <input
                                                    type="text"
                                                    value={livro.aut_nome}
                                                    onChange={(e) => setLivro({ ...livro, aut_nome: e.target.value })}
                                                    className={`${styles.editInputIcons} ${styles.editInput}`}
                                                    aria-label="Nome do autor"
                                                />
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
                                                <input
                                                    type="text"
                                                    value={livro.edt_nome}
                                                    onChange={(e) => setLivro({ ...livro, edt_nome: e.target.value })}
                                                    className={`${styles.editInputIcons} ${styles.editInput}`}
                                                    aria-label="Nome da editora"
                                                />
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
                                                <input
                                                    type="text"
                                                    value={livro.gen_nome}
                                                    onChange={(e) => setLivro({ ...livro, gen_nome: e.target.value })}
                                                    className={`${styles.editInputIcons} ${styles.editInput}`}
                                                    aria-label="Gênero do livro"
                                                />
                                            </div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h1>Não há resultados para a requisição</h1>
                    )}
                </div>
            </div>
        </main>
    );
}
