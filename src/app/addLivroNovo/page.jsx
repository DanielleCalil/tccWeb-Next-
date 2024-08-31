import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function AddLivroNovo() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 class={styles.addLivroNovo}>Adicionar livro novo</h1>
                <div class={styles.container}>
                    <div class={styles.inputTotal}>
                        <div class={styles.inputImgContainer}>
                            <div class={styles.imgBook}>
                                <p class={styles.textCapa}>Capa:</p>
                                <label
                                    for="file-upload"
                                    class={styles.uploadButton}>
                                    Escolher Imagem</label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    class={styles.inputWrapper}
                                />
                            </div>
                            <div class={styles.inputGroup}>
                                <text class={styles.text}>Quantidade:</text>
                                <input
                                    type="number"
                                    class={styles.inputQuant}
                                />
                            </div>
                        </div>
                        <div class={styles.inputContainer}>
                            <div class={styles.inputGroup}>
                                <p class={styles.textInput}>Nome:</p>
                                <input
                                    type="text"
                                    class={styles.inputField}
                                />
                            </div>
                            <div class={styles.inputGroup}>
                                <p class={styles.textInput}>Autor:</p>
                                <input
                                    type="text"
                                    class={styles.inputField}
                                />
                            </div>
                            <div class={styles.inputGroup}>
                                <p class={styles.textInput}>Editora:</p>
                                <input
                                    type="text"
                                    class={styles.inputField}
                                />
                            </div>
                            <div class={styles.inputGroup}>
                                <text class={styles.textInput}>Gênero:</text>
                                <input
                                    type="text"
                                    class={styles.inputField}
                                />
                            </div>
                            <div class={styles.inputGroup}>
                                <text class={styles.textInput}>Resumo:</text>
                                <textarea
                                    id="resumo"
                                    name="resumo"
                                    class={styles.inputResumo}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div class={styles.editar}>
                        <Link href="/biblioteca/">
                            <button class={styles.addButton}>Adicionar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}