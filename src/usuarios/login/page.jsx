import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { IoSearchOutline } from "react-icons/io5";

export default function Login() {
    return (
        <div className="containerGlobal">
            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <Image
                            src="/imagens_telas/6737457.png"
                            alt="Imagem tela de login"
                            className={styles.imgLogin}
                        />
                    </div>
                    <div className={styles.conteudo}>
                        <h1 className={styles.login}>Login</h1>
                        <input
                            type="number"
                            placeholder="RM"
                            className={styles.inputField}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className={styles.inputField}
                        />
                        <div className={styles.cadastre}>
                            Não tem cadastro? <Link href="/signUp/">Cadastre-se</Link>
                        </div>
                        <div className={styles.esqueceuSenha}>
                            <Link href="/esqueceuSenha1/">Esqueceu a senha?</Link>
                        </div>
                        <Link href="/telaInicial/">
                            <button className={styles.loginButton}>Fazer login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}