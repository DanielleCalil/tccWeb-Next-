"use client"
import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IoEye, IoEyeOff  } from "react-icons/io5";

import { IoSearchOutline } from "react-icons/io5";

export default function EsqueceuSenha2() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

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
                        <div class={styles.containerInput}>
                            <input
                                type="number"
                                placeholder="Código"
                                class={styles.inputField}
                            />
                            <div className={styles.passwordContainer}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Senha"
                                    className={`${styles.inputField} ${styles.senhaField}`}
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className={styles.eyeIcon}
                                >
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </span>
                            </div>
                            <div className={styles.passwordContainer}>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirme a nova senha"
                                    className={`${styles.inputField} ${styles.senhaField}`}
                                />
                                <span
                                    onClick={toggleConfirmPasswordVisibility}
                                    className={styles.eyeIcon}
                                >
                                    {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                                </span>
                            </div>
                        </div>
                        <Link href="/usuarios/login">
                            <button class={styles.redefinirButton}>Redefinir senha</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}