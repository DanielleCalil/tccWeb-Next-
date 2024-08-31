import styles from './page.module.css';

import { IoSearchOutline } from "react-icons/io5";

export default function BarraPesquisa () {
    return(
        <div className="containerGlobal">
             <div className={styles.searchContainer}>
                <input type="text" placeholder="Pesquisar" id="search-input" className={styles.input} />
                <button type="button" className={styles.button}>
                    <IoSearchOutline className={styles.icone} />
                </button>
            </div>
        </div>
    );
}