import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Perfil() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <div className={styles.contentWrapper}>
                    <h1 className={styles.perfil}>Perfil</h1>
                    <div className={styles.parentContainer}>
                        <div className={styles.PIContainer}>
                            <div className={styles.profileContainer}>
                                <div className={styles.imgContainer}>
                                    <Image
                                        src="/Icons TCC/perfil.jpg"
                                        alt="Foto de perfil padrão"
                                        width={512}
                                        height={512}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.inputGroup}>
                                    <p className={styles.textInput}>RM:</p>
                                    <input
                                        type="number"
                                        className={styles.inputField}
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <p className={styles.textInput}>Nome social:</p>
                                    <input
                                        type="text"
                                        className={styles.inputField}
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <p className={styles.textInput}>Nome completo:</p>
                                    <input
                                        type="text"
                                        className={styles.inputField}
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <text className={styles.textInput}>E-mail:</text>
                                    <input
                                        type="email"
                                        className={styles.inputField}
                                        disabled
                                    />
                                </div>
                                <form className={styles.sexoForm}>
                                    <legend>Sexo:</legend>
                                    <label>
                                        <input
                                            type="radio"
                                            name="opcao"
                                            value="feminino"
                                            disabled
                                        />
                                        Feminino
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="opcao"
                                            value="masculino"
                                            disabled
                                        />
                                        Masculino
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="opcao"
                                            value="neutro"
                                            disabled
                                        />
                                        Neutro
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="opcao"
                                            value="padrao"
                                            disabled
                                        />
                                        Padrão
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={styles.redefinir}>
                        <Link href="/usuarios/esqueceuSenha1">Esqueceu a senha?</Link>
                    </div>
                    <div className={styles.editar}>
                        <Link href="/perfilEditar">
                            <button
                                type="submit"
                                className={styles.editarButton}
                            >
                                <Image
                                    src="/imagens_telas/editar_perfil.png"
                                    width={500}
                                    height={500}
                                />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
