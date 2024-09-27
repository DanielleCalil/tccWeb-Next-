"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import FileInput from '@/componentes/FileInput/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page';
import ModalAddAutor from '@/componentes/modalAddAutor/page';
import ModalAddEditora from '@/componentes/modalAddEditora/page';
import ModalAddGenero from '@/componentes/modalAddGenero/page';

export default function AddLivroNovo() {
    const [capaImage, setCapaImage] = useState('/imagens_telas/imgLivroNovo.jpg');
    const router = useRouter();

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);
    const handleConfirm = () => {
        setShowModalConfirm(false);
        router.push('../biblioteca');
    };

    const [showModalAutor, setShowModalAutor] = useState(false);
    const openModalAutor = () => setShowModalAutor(true);
    const closeModalAutor = () => setShowModalAutor(false);
    const handleAutor = () => {
        setShowModalAutor(false);
        router.push('../gerenciarLivroExistente');
    };

    const [showModalEditora, setShowModalEditora] = useState(false);
    const openModalEditora = () => setShowModalEditora(true);
    const closeModalEditora = () => setShowModalEditora(false);
    const handleEditora = () => {
        setShowModalEditora(false);
        router.push('../gerenciarLivroExistente');
    };

    const [showModalGenero, setShowModalGenero] = useState(false);
    const openModalGenero = () => setShowModalGenero(true);
    const closeModalGenero = () => setShowModalGenero(false);
    const handleGenero = () => {
        setShowModalGenero(false);
        router.push('../gerenciarLivroExistente');
    };

    const handleFileSelect = (imageUrl) => {
        setCapaImage(imageUrl);
    };

    const [selectedAutor, setSelectedAutor] = useState('');
    const [selectedEditora, setSelectedEditora] = useState('');
    const [selectedGenero, setSelectedGenero] = useState('');

    const [autores, setAutores] = useState([]);
    const [editoras, setEditoras] = useState([]);
    const [generos, setGeneros] = useState([]);

    const handleChangeAutor = (event) => {
        setSelectedAutor(event.target.value);
    };

    const handleChangeEditora = (event) => {
        setSelectedEditora(event.target.value);
    };

    const handleChangeGenero = (event) => {
        setSelectedGenero(event.target.value);
    };

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const autoresResponse = await fetch('/autores'); // Substitua pela URL da sua API
                const editorasResponse = await fetch('/editoras'); // Substitua pela URL da sua API
                const generosResponse = await fetch('/generos'); // Substitua pela URL da sua API

                const autoresData = await autoresResponse.json();
                const editorasData = await editorasResponse.json();
                const generosData = await generosResponse.json();

                setAutores(autoresData);
                setEditoras(editorasData);
                setGeneros(generosData);
            } catch (error) {
                console.error('Erro ao buscar opções:', error);
            }
        };

        fetchOptions();
    }, []);

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.addLivroNovo}>Adicionar livro novo</h1>
                <div className={styles.container}>
                    <div className={styles.inputTotal}>
                        <div className={styles.inputImgContainer}>
                            <div className={styles.imgBook}>
                                <p className={styles.textInput}>Capa:</p>
                                <div className={styles.imagePreview}>
                                    <Image
                                        src={capaImage}
                                        alt="Capa do livro"
                                        width={150}
                                        height={200}
                                    />
                                </div>
                                <FileInput onFileSelect={handleFileSelect} />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Quantidade:</p>
                                <input
                                    type="number"
                                    className={styles.inputQuant}
                                />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Nome:</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="autores" className={styles.textInput}>Autor:</label>
                                <select id="autores" value={selectedAutor} onChange={handleChangeAutor} className={styles.inputField}>
                                    <option value="">Selecione...</option>
                                    {autores.map(autor => (
                                        <option key={autor.id} value={autor.id}>{autor.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="editoras" className={styles.textInput}>Editora:</label>
                                <select id="editoras" value={selectedEditora} onChange={handleChangeEditora} className={styles.inputField}>
                                    <option value="">Selecione...</option>
                                    {editoras.map(editora => (
                                        <option key={editora.id} value={editora.id}>{editora.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="generos" className={styles.textInput}>Gênero:</label>
                                <select id="generos" value={selectedGenero} onChange={handleChangeGenero} className={styles.inputField}>
                                    <option value="">Selecione...</option>
                                    {generos.map(genero => (
                                        <option key={genero.id} value={genero.id}>{genero.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Resumo:</p>
                                <textarea
                                    id="resumo"
                                    name="resumo"
                                    className={styles.inputResumo}
                                />
                            </div>
                            <div className={styles.tresModais}>
                                {/* Modal para adicionar autor */}
                                <button
                                    type="button"
                                    onClick={openModalAutor}
                                    className={styles.addButton}
                                >
                                    Adicionar Autor(a)
                                </button>
                                <ModalAddAutor
                                    show={showModalAutor}
                                    onClose={closeModalAutor}
                                    onConfirm={handleAutor}
                                />

                                {/* Modal para adicionar editora */}
                                <button
                                    type="button"
                                    onClick={openModalEditora}
                                    className={styles.addButton}
                                >
                                    Adicionar Editora
                                </button>
                                <ModalAddEditora
                                    show={showModalEditora}
                                    onClose={closeModalEditora}
                                    onConfirm={handleEditora}
                                />

                                {/* Modal para adicionar gênero */}
                                <button
                                    type="button"
                                    onClick={openModalGenero}
                                    className={styles.addButton}
                                >
                                    Adicionar Gênero
                                </button>
                                <ModalAddGenero
                                    show={showModalGenero}
                                    onClose={closeModalGenero}
                                    onConfirm={handleGenero}
                                />
                            </div>
                            <p className={styles.obs}>Obs.: se já tiver adicionado o que deseja em alguns dos botões acima é só selecionar o que deseja no campo selecionável desejável.</p>
                        </div>
                    </div>

                    <div className={styles.editar}>
                        <button
                            type="button"
                            onClick={openModalConfirm}
                            className={styles.addButtonPrinc}
                        >
                            Adicionar
                        </button>
                    </div>
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
