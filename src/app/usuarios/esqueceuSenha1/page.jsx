import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { IoSearchOutline } from "react-icons/io5";

export default function EsqueceuSenha1() {
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
                        <text className={styles.texto}>Digite o seu e-mail no campo abaixo e lhe enviaremos um código de ativação.</text>
                        <input
                            type="email"
                            placeholder="E-mail"
                            className={styles.inputField}
                        />
                        <div className={styles.logar}>
                            Já tem uma conta? <Link href="/usuarios/login">Faça login</Link>
                        </div>
                        <Link href="/usuarios/esqueceuSenha2">
                            <button className={styles.redefinirButton}>Redefinir</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}