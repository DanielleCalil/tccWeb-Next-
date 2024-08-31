import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { IoSearchOutline } from "react-icons/io5";

export default function EsqueceuSenha2() {
    return (
        <div className="containerGlobal">
            <div class={styles.background}>
                <div class={styles.container}>
                    <div class={styles.imgContainer}>
                        <Image
                            src="/imagens_telas/6333054.png"
                            alt="Imagem tela de redefinir senha"
                            class={styles.imgEsqSenha}
                        />
                    </div>
                    <div class={styles.conteudo}>
                        <h1 class={styles.redefinirSenha}>Redefinir senha</h1>
                        <text class={styles.texto}>Por favor, insira no campo abaixo o código de ativação que você recebeu por e-mail e redefina uma nova senha.</text>
                        <div class={styles.containerInput}>
                            <input
                                type="number"
                                placeholder="Código"
                                class={styles.inputField}
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                class={styles.inputField}
                            />
                            <input
                                type="password"
                                placeholder="Confirme a nova senha"
                                class={styles.inputField}
                            />
                        </div>
                        <a href="/login/">
                            <button class={styles.redefinirButton}>Redefinir senha</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}