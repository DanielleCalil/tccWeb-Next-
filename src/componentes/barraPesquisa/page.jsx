"use client";
import styles from './page.module.css';
import { IoSearchOutline } from 'react-icons/io5';

export default function BarraPesquisa({livNome, atLivNome, listaLivros}) {
    return (
        <div className="containerGlobal">
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Pesquisar"
                    id="search-input"
                    className={styles.input}
                    onChange={v => atLivNome(v.target.value)}
                    value={livNome}
                />
                <button type="button" className={styles.button} onClick={() => listaLivros()}>
                    <IoSearchOutline className={styles.icone} />
                </button>
            </div>
        </div>
    );
}
