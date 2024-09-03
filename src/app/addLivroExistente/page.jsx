import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function AddLivroExistente() {
    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.addLivroExistente}>Adicionar livro existente</h1>
                <div className={styles.container}>
                    <div>
                        <p className={styles.pUsuario}>Selecione o livro:</p>
                        <div className={styles.opcao}>
                            <select id="options" className={styles.selectInput}>
                                <option value="" disabled selected>
                                    Selecione uma opção
                                </option>
                                <option value="OdiáriodeAnneFrank(AnneFrank)">
                                    O diário de Anne Frank - Anne Frank
                                </option>
                                <option value="DomCasmurro(MachadodeAssis)">
                                    Dom Casmurro - Machado de Assis
                                </option>
                                <option value="RomeueJulieta(WilliamShakespeare)">
                                    Romeu e Julieta - William Shakespeare
                                </option>
                                <option value="1984(GeorgeOrwell)">
                                    1984 - George Orwell
                                </option>
                                <option value="OsMiseráveis(VictorHugo)">
                                    Os Miseráveis - Victor Hugo
                                </option>
                                <option value="OrgulhoePreconceito(JaneAusten)">
                                    Orgulho e Preconceito - Jane Austen
                                </option>
                                <option value="Verity(CollenHoover)">
                                    Verity - Collen Hoover
                                </option>
                                <option value="Heartstopper(AliceOseman)">
                                    Heartstopper - Alice Oseman
                                </option>
                                <option value="Deixadaparatrás(CharlieDonlea)">
                                    Deixada para trás - Charlie Donlea
                                </option>
                                <option value="Arevoluçãodosbichos(GeorgeOrwell)">
                                    A revolução dos bichos - George Orwell
                                </option>
                                <option value="Procurenascinzas(CharlieDonlea)">
                                    Procure nas cinzas - Charlie Donlea
                                </option>
                                <option value="HarryPottereaPedraFilosofal(J.K.Rowling)">
                                    Harry Potter e a Pedra Filosofal - J.K. Rowling
                                </option>
                                <option value="Ossetemaridosdeevelynhugo(TaylorJekinsReid)">
                                    Os Sete Maridos de Evelyn Hugo - Taylor Jekins Reid
                                </option>
                                <option value="Agarotadolago(CharlieDonlea)">
                                    A Garota do Lago - Charlie Donlea
                                </option>
                                <option value="Dracula(BramStoker)">
                                    Drácula - Bram Stoker
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.editar}>
                <Link href="/biblioteca/">
                    <button className={styles.addButton}>Adicionar</button>
                </Link>
            </div>
        </main>
    );
}
