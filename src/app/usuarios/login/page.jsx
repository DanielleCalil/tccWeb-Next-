"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline } from "react-icons/io5";
import { IoEye, IoEyeOff } from "react-icons/io5";
import api from '../../../services/api';

export default function Login() {
    const router = useRouter();

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function handleSubmit(event) {
        event.preventDefault();
        logar();
    }

    async function logar() {

        try {
            const dados = {
                usu_email: login,
                usu_senha: senha
            }

            const response = await api.post('/usuarios/login', dados);

            if (response.data.sucesso == true) {
                const usuario = response.data.dados;
                const objLogado = {
                    "id": usuario.usu_id,
                    "nome": usuario.usu_nome,
                    "acesso": usuario.usu_tipo
                };
                // signin(JSON.stringify(objLogado));                
                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(objLogado));
                router.push('/'); // é possível direcionar de acordo com a situação

            } else {
                alert('Erro: ' + response.data.mensagem + '\n' + response.data.dados)
            }

        } catch (error) {
            if (error.response) {
                alert(error.response.data.dados == null ?
                    error.response.data.mensagem
                    :
                    error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    return (
        <div className="containerGlobal">
            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <Image
                            src="/imagens_telas/6737457.png"
                            alt="Imagem tela de login"
                            className={styles.imgLogin}
                            width={500}
                            height={500}
                        />
                    </div>
                    <form id="form" className={styles.conteudo} onSubmit={handleSubmit}>
                        <h1 className={styles.login}>Login</h1>
                        <input
                            type="number"
                            placeholder="RM"
                            className={styles.inputField}
                            onChange={v => setLogin(v.target.value)}
                            value={login}
                        />
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Senha"
                                className={styles.inputField}
                                onChange={v => setSenha(v.target.value)}
                                value={senha}
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className={styles.eyeIcon}
                            >
                                {showPassword ? <IoEyeOff /> : <IoEye />}
                            </span>
                        </div>
                        <div className={styles.cadastre}>
                            Não tem cadastro? <Link href="/usuarios/signUp">Cadastre-se</Link>
                        </div>
                        <div className={styles.esqueceuSenha}>
                            <Link href="/usuarios/esqueceuSenha1">Esqueceu a senha?</Link>
                        </div>
                        <button type="submit" className={styles.loginButton}>Fazer login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
