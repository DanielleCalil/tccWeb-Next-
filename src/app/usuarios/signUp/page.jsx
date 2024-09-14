"use client"
import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUp() {
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
            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <Image
                            src="/imagens_telas/img_cadastro.png"
                            alt="Imagem tela de cadastro"
                            className={styles.imgCadastro}
                            width={500}
                            height={453}
                        />
                    </div>
                    <div className={styles.conteudo}>
                        <h1 className={styles.cadastro}>Cadastro</h1>
                        <input
                            type="number"
                            placeholder="RM"
                            className={styles.inputField}
                        />
                        <input
                            type="text"
                            placeholder="Nome completo"
                            className={styles.inputField}
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            className={styles.inputField}
                        />
                        <div className={styles.passwordRow}>
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
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <div className={styles.passwordContainer}>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirmar senha"
                                    className={`${styles.inputField} ${styles.senhaField}`}
                                />
                                <span
                                    onClick={toggleConfirmPasswordVisibility}
                                    className={styles.eyeIcon}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <form className={styles.sexoForm}>
                            <legend>Sexo:</legend>
                            <label>
                                <input
                                    type="radio"
                                    name="opcao"
                                    value="feminino"
                                />
                                Feminino
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="opcao"
                                    value="masculino"
                                />
                                Masculino
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="opcao"
                                    value="neutro"
                                />
                                Neutro
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="opcao"
                                    value="padrao"
                                />
                                Padrão
                            </label>
                        </form>
                        <div className={styles.logar}>
                            Já tem uma conta? <Link href="/usuarios/login">Faça login</Link>
                        </div>
                        <Link href="/usuarios/login">
                            <button type="submit" className={styles.cadastroButton}>Fazer cadastro</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
