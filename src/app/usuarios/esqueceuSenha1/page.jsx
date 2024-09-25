"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/services/api';

import { IoSearchOutline } from "react-icons/io5";
import { IoEye, IoEyeOff, IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";

export default function EsqueceuSenha1() {
    const router = useRouter();

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

        // salvar quando atingir o número de itens a serem validados
        // alert(itensValidados);
        if (itensValidados === 1) {
            // alert('chama api');            

            try {
                let confirmaCad;
                const response = await api.post('/usuarios', usuario);
                confirmaCad = response.data.sucesso;
                // const idUsu = confirmaCad;
                // alert(idUsu);
                if (confirmaCad) {
                    router.push('/usuarios/esqueceuSenha2')
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.mensagem + '\n' + error.response.data.dados);
                } else {
                    alert('Erro no front-end' + '\n' + error);
                }
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
                            <text className={styles.texto}>Digite o seu e-mail no campo abaixo e lhe enviaremos um código de ativação.</text>


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
                                className={styles.redefinirButton}>
                                Redefinir
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}