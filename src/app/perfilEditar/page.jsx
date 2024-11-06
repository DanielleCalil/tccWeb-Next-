"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import { IoChevronBack, IoChevronForward, IoCaretBack, IoCaretForward } from "react-icons/io5";
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
    const [selectedSexo, setSelectedSexo] = useState('');
    const [cursoSelecionado, setCursoSelecionado] = useState(null);

    const handleClick = (cur_cod) => {
        setCursoSelecionado(cur_cod);
    };

    const handleAddCurso = async (cur_cod) => {
        try {
            const response = await api.post(`/usuarios_cursos`, { cur_cod });
            if (response.data.sucesso) {
                alert('Curso adicionado com sucesso!');
                setCursos(cursos.filter(c => c.cur_cod !== cur_cod)); // Remove o curso da lista de disponíveis
                setPerfilEdt({
                    ...perfilEdt,
                    cursos: [...perfilEdt.cursos, cursos.find(c => c.cur_cod === cur_cod)]
                });
            }
        } catch (error) {
            console.error("Erro ao adicionar curso:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao adicionar curso. Tente novamente.');
        }
    };

    const handleRemoveCurso = async (cur_cod) => {
        try {
            const response = await api.delete(`/usuarios_cursos/${usu_cod}`);
            if (response.data.sucesso) {
                alert('Curso removido com sucesso!');
                const cursoRemovido = perfilEdt.cursos.find(c => c.cur_cod === cur_cod);
                setPerfilEdt({
                    ...perfilEdt,
                    cursos: perfilEdt.cursos.filter(c => c.cur_cod !== cur_cod)
                });
                setCursos([...cursos, cursoRemovido]); // Adiciona o curso de volta à lista de disponíveis
            }
        } catch (error) {
            console.error("Erro ao remover curso:", error);
            alert(error.response ? error.response.data.mensagem : 'Erro ao remover curso. Tente novamente.');
        }
    };

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
        "cur_cod": '',
        "cur_nome": '',
    });

    const handleFileSelect = (imageUrl) => {
        setImageSrc(imageUrl);
    };

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [imageSrc, setImageSrc] = useState(perfilEdt.liv_foto_capa || '');

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = async () => {
        try {
            closeModalConfirm(); // Fecha o modal de confirmação
            await handleSave();  // Aguarda o salvamento dos dados
        } catch (error) {
            // Lide com erros que possam ocorrer ao tentar salvar
            console.error("Erro ao confirmar a ação:", error);
            alert('Ocorreu um erro ao tentar salvar. Por favor, tente novamente.'); // Mensagem para o usuário
        }
    };

    useEffect(() => {
        listaCursos();
    }, []);

    async function listaCursos() {
        try {
            const response = await api.get('/dispUsucursos', { codUsu });
            setCursos(response.data.dados);
             console.log(codUsu);            
             console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    useEffect(() => {
        if (!codUsu) return;

        const handleCarregaPerfil = async () => {
            const dados = { usu_cod: codUsu };

            try {
                const response = await api.post('/usuarios', dados);
                if (response.data.sucesso) {
                    const edtPerfilApi = response.data.dados[0];
                    setPerfilEdt(edtPerfilApi);

                    setSelectedSexo(edtPerfilApi.usu_sexo);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfilEdt(prev => ({ ...prev, [name]: value }));
    }

    const handleChangeSexo = (e) => {
        // Atualiza o valor de 'usu_sexo' com base na seleção do usuário
        setSelectedSexo(e.target.value);
    };

    const handleSave = async () => {
        const { usu_rm, usu_nome, usu_email, cur_nome, usu_sexo } = perfilEdt;

        // Adiciona um log para ver os dados que estão sendo enviados
        console.log("Dados a serem enviados:", {
            usu_rm,
            usu_nome,
            usu_email,
            cur_nome,
            usu_sexo,
            usu_foto: imageSrc, // Não esqueça de incluir a foto se necessário
        });

        if (!usu_email || !cur_nome || !usu_sexo) {
            alert('Todos os campos devem ser preenchidos');
            return;
        }

        setIsSaving(true); // Inicia o salvamento

        try {
            const response = await api.patch(`/usuarios/${perfilEdt.usu_cod}`, {
                ...perfilEdt,
                usu_foto: imageSrc, // Inclui a foto se necessário
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

    console.log(perfilEdt);
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.perfil}>Perfil</h1>
                {perfilEdt.usu_cod ? (
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
                                    value={perfilEdt.usu_social}
                                    onChange={(e) => setPerfilEdt({ ...perfilEdt, usu_social: e.target.value })}
                                    className={styles.inputField}
                                    aria-label="Nome Social"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <p className={styles.textInput}>Nome completo:</p>
                                <input
                                    type="text"
                                    value={perfilEdt.usu_nome}
                                    onChange={(e) => setPerfilEdt({ ...perfilEdt, usu_nome: e.target.value })}
                                    className={styles.inputField}
                                    aria-label="Nome Completo"
                                    disabled
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.textInput}>E-mail:</label>
                                <input
                                    type="email"
                                    value={perfilEdt.usu_email}
                                    onChange={(e) => setPerfilEdt({ ...perfilEdt, usu_email: e.target.value })}
                                    className={styles.inputField}
                                    aria-label="E-mail"
                                />
                            </div>
                            <div className={styles.listaCursos}>

                                <div className={styles.inputCursos}>
                                    <label className={styles.textInput}>Cursos já selecionados:</label>
                                    <ul
                                        id="cur_cod"
                                        name="cur_cod"
                                        value={perfilEdt.cur_cod}
                                        onChange={handleChange}
                                        className={styles.opcaoCursos}
                                    >

                                        {perfilEdt.cursos.length > 0 ? (
                                            perfilEdt.cursos.map((cur) => (
                                                <li
                                                    key={cur.cur_cod}
                                                    value={cur.cur_cod}
                                                    onClick={() => handleClick(cur.cur_cod)}
                                                    className={cursoSelecionado === cur.cur_cod ? styles.selected : ''}>
                                                    {cur.cur_nome}
                                                </li>
                                            ))
                                        ) : (
                                            <p>Não há cursos registrados.</p>
                                        )}
                                    </ul>
                                </div>
                                <div className={styles.buttons}>
                                    <button className={styles.cursosButton}
                                     onClick={() => cursoSelecionado && handleAddCurso(cursoSelecionado)}>
                                        <IoChevronBack size={20} color="#FFF" />
                                    </button>
                                    <button className={styles.cursosButton}
                                     onClick={() => cursoSelecionado && handleRemoveCurso(cursoSelecionado)}>
                                        <IoChevronForward size={20} color="#FFF" />
                                    </button>
                                </div>
                                <div className={styles.inputCursos}>
                                    <label className={styles.textInput}>Selecione o curso:</label>
                                    <ul
                                        id="cur_cod"
                                        name="cur_cod"
                                        value={perfilEdt.cur_cod}
                                        onChange={handleChange}
                                        className={styles.opcaoCursos}
                                    >

                                        {cursos.length > 0 ? (
                                            cursos.map((cur) => (
                                                <li
                                                    key={cur.cur_cod}
                                                    value={cur.cur_cod}
                                                    onClick={() => handleClick(cur.cur_cod)}
                                                    className={cursoSelecionado === cur.cur_cod ? styles.selected : ''}>
                                                    {cur.cur_nome}
                                                </li>
                                            ))
                                        ) : (
                                            <p>Não há cursos registrados.</p>
                                        )}
                                    </ul>
                                </div>
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
                                            checked={Number(perfilEdt.usu_sexo) === Number(opcao.value)}
                                            onChange={(e) => {
                                                setSelectedSexo(e.target.value); // Atualiza selectedSexo
                                                setPerfilEdt({ ...perfilEdt, usu_sexo: e.target.value }); // Atualiza perfilEdt
                                            }}
                                        />
                                        {opcao.label.charAt(0).toUpperCase() + opcao.label.slice(1)}
                                    </label>
                                ))}
                            </form>
                        </div>
                    </div>

                ) : (
                    <h1 className={styles.aviso}>Não há resultados para a requisição</h1>
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
