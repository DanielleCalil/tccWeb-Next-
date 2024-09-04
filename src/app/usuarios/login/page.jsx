"use client"
import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline } from "react-icons/io5";
import { IoEye, IoEyeOff  } from "react-icons/io5";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                    <div className={styles.conteudo}>
                        <h1 className={styles.login}>Login</h1>
                        <input
                            type="number"
                            placeholder="RM"
                            className={styles.inputField}
                        />
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Senha"
                                className={styles.inputField}
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
                        <Link href="/">
                            <button className={styles.loginButton}>Fazer login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
