"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IoEye, IoEyeOff, IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import api from '@/services/api';

import { IoSearchOutline } from "react-icons/io5";

export default function EsqueceuSenha2() {
    const router = useRouter();

    const [usuario, setUsuario] = useState({
        codigo: '',
        usu_senha: '',
        confSenha: '',
    });

    const valDefault = styles.formControl;
    const valSucesso = styles.formControl + ' ' + styles.success;
    const valErro = styles.formControl + ' ' + styles.error;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // validação
    const [valida, setValida] = useState({
        codigo: {
            validado: valDefault,
            mensagem: []
        },
        senha: {
            validado: valDefault,
            mensagem: []
        },
        confSenha: {
            validado: valDefault,
            mensagem: []
        }
    });

    const handleChange = (e) => {
        setUsuario(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function validaCodigo() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (usuario.codigo === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O código é obrigatório');
        } else if (usuario.codigo.length < 4) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Código inválido');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            codigo: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaSenha() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.usu_senha === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O preenchimento da senha é obrigatório');
        } else if (usuario.usu_senha.length < 3) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A senha deve ter pelo menos 3 caracteres');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            senha: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaConfSenha() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.confSenha === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A confirmação da senha é obrigatória');
        } else if (usuario.confSenha !== usuario.usu_senha) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A senha e a confirmação devem ser iguais');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            confSenha: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let itensValidados = 0;
        itensValidados += validaCodigo();
        itensValidados += validaSenha();
        itensValidados += validaConfSenha();

        // salvar quando atingir o número de itens a serem validados
        // alert(itensValidados);
        if (itensValidados === 3) {
            // alert('chama api');            

            try {
                let confirmaCad;
                const response = await api.post('/usuarios', usuario);
                confirmaCad = response.data.sucesso;
                // const idUsu = confirmaCad;
                // alert(idUsu);
                if (confirmaCad) {
                    router.push('/usuarios/login')
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
            <div class={styles.background}>
                <div class={styles.container}>
                    <div class={styles.imgContainer}>
                        <Image
                            src="/imagens_telas/6333054.png"
                            alt="Imagem tela de redefinir senha"
                            class={styles.imgEsqSenha}
                            width={373}
                            height={384}
                        />
                    </div>
                    <h1 class={styles.redefinirSenha}>Redefinir senha</h1>
                    <text class={styles.texto}>Por favor, insira no campo abaixo o código de ativação que você recebeu por e-mail e redefina uma nova senha.</text>
                    <div class={styles.conteudo}>

                        <form id="form" onSubmit={handleSubmit}>
                            <div class={styles.containerInput}>
                                <div className={valida.codigo.validado + ' ' + styles.valCodigo} id="valCodigo">
                                    <div className={styles.divInput}>
                                        <input
                                            type="number"
                                            name="codigo"
                                            placeholder="Código"
                                            class={styles.inputField}
                                            onChange={handleChange}
                                        />
                                        <IoCheckmarkCircleOutline className={styles.sucesso} />
                                        <IoAlertCircleOutline className={styles.erro} />
                                    </div>
                                    {
                                        valida.codigo.mensagem.map(mens => <small key={mens} id="codigo" className={styles.small}>{mens}</small>)
                                    }
                                </div>

                                <div className={styles.passwordContainer}>
                                    <div className={valida.senha.validado} id="validaSn1">
                                        <div className={styles.divInput}>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="usu_senha"
                                                placeholder="Senha"
                                                className={`${styles.inputField} ${styles.senhaField}`}
                                                onChange={handleChange}
                                            />
                                            <IoCheckmarkCircleOutline className={styles.sucesso} />
                                            <IoAlertCircleOutline className={styles.erro} />
                                            <span
                                                onClick={togglePasswordVisibility}
                                                className={styles.eyeIcon}
                                            >
                                                {showPassword ? <IoEyeOff /> : <IoEye />}
                                            </span>
                                        </div>
                                        {
                                            valida.senha.mensagem.map(mens => <small key={mens} id="senha" className={styles.small}>{mens}</small>)
                                        }
                                    </div>
                                </div>

                                <div className={styles.passwordContainer}>
                                    <div className={valida.confSenha.validado} id="validaSn2">
                                        <div className={styles.divInput}>
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confSenha"
                                                placeholder="Confirme a nova senha"
                                                className={`${styles.inputField} ${styles.senhaField}`}
                                                onChange={handleChange}
                                            />
                                            <IoCheckmarkCircleOutline className={styles.sucesso} />
                                            <IoAlertCircleOutline className={styles.erro} />
                                            <span
                                                onClick={toggleConfirmPasswordVisibility}
                                                className={styles.eyeIcon}
                                            >
                                                {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                                            </span>
                                        </div>
                                        {
                                            valida.confSenha.mensagem.map(mens => <small key={mens} id="confSenha" className={styles.small}>{mens}</small>)
                                        }
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                class={styles.redefinirButton}>
                                Redefinir senha
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}