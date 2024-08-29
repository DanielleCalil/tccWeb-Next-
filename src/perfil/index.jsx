import Image from "next/image";
import styles from "./page.module.css";

export default function Perfil() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <div class="content-wrapper">
                    <main>
                        <h1 class="perfil">Perfil</h1>
                        <div class="parent-container">
                            <div class="p-i-container">
                                <div class="profile-container">
                                    <div class="img-container">
                                        <Image src="/Icons TCC/perfil.jpg" alt="Foto de perfil" />
                                    </div>
                                </div>
                                <div class="input-container">
                                    <div class="input-group">
                                        <p class="text-input">RM:</p>
                                        <input type="number" class="input-field input-rm" disabled />
                                    </div>
                                    <div class="input-group">
                                        <p class="text-input">Nome social:</p>
                                        <input type="text" class="input-field" disabled />
                                    </div>
                                    <div class="input-group">
                                        <p class="text-input">Nome completo:</p>
                                        <input type="text" class="input-field" disabled />
                                    </div>
                                    <div class="input-group">
                                        <text class="text-input">E-mail:</text>
                                        <input type="email" class="input-field" disabled />
                                    </div>
                                    <form class="sexo-form">
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
                        <div class="redefinir">
                            <a href="/esqueceuSenha1/">Esqueceu a senha?</a>
                        </div>
                        <div class="editar">
                            <a href="/perfilEditar/">
                                <button type="submit" class="cadastro-button">
                                    <Image src="/imagens_telas/editar_perfil.png" />
                                </button>
                            </a>
                        </div>
                    </main>
                </div>
            </div>
        </main>
    );
}
