"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/services/api';

import { IoSearchOutline } from "react-icons/io5";
import { IoEye, IoEyeOff, IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import ModalEsqueceuSenha from '@/componentes/modalEsqueceuSenha/page';

export default function EsqueceuSenha1() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const [usuario, setUsuario] = useState({
        usu_email: '',
    });

    const valDefault = styles.formControl;
    const valSucesso = styles.formControl + ' ' + styles.success;
    const valErro = styles.formControl + ' ' + styles.error;

    // validação
    const [valida, setValida] = useState({
        email: {
            validado: valDefault,
            mensagem: []
        },
    });

    const handleChange = (e) => {
        setUsuario(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function checkEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }

    function validaEmail() {
        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.usu_email === "") {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o e-mail');
        } else if (!checkEmail(usuario.usu_email)) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira um e-mail válido');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            email: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let itensValidados = 0;
        itensValidados += validaEmail();

        if (itensValidados === 1) {
            setShowModal(true);
            try {
                if (usuario.usu_email) {
                    const responseEmail = await api.post('/red_senha', { usu_email: usuario.usu_email });
                    if (responseEmail.data.sucesso) {
                        console.log('E-mail enviado com sucesso!');

                    } else {
                        alert('Erro ao enviar o e-mail:', responseEmail.data.mensagem);
                    }
                }
            } catch (error) {
                alert('Erro no servidor:', error);
            }
        }
    }

    return (
        <div className="containerGlobal">
            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <Image
                            src="/imagens_telas/6333054.png"
                            alt="Imagem tela de redefinir senha"
                            className={styles.imgEsqSenha}
                            width={373}
                            height={384}
                        />
                    </div>
                    <div className={styles.conteudo}>
                        <h1 className={styles.redefinirSenha}>Redefinir senha</h1>
                        <form id="form" onSubmit={handleSubmit}>
                            <text className={styles.texto}>Digite o seu e-mail no campo abaixo.</text>

                            <div className={valida.email.validado + ' ' + styles.valNome} id="valEmail">
                                <div className={styles.divInput}>
                                    <input
                                        type="email"
                                        name="usu_email"
                                        placeholder="E-mail"
                                        className={styles.inputField}
                                        onChange={handleChange}
                                    />
                                    <IoCheckmarkCircleOutline className={styles.sucesso} />
                                    <IoAlertCircleOutline className={styles.erro} />
                                </div>
                                {
                                    valida.email.mensagem.map(mens => <small key={mens} id="email" className={styles.small}>{mens}</small>)
                                }
                            </div>

                            <div className={styles.logar}>
                                Já tem uma conta? <Link href="/usuarios/login">Faça login</Link>
                            </div>

                            <button
                                type="submit"
                                // onClick={handleSubmit}
                                className={styles.redefinirButton}>
                                Redefinir
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ModalEsqueceuSenha show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}