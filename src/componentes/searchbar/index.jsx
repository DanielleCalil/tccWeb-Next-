import styles from './index.module.css';

import { MdSearch } from "react-icons/md";

export default function Searchbar () {
    return(
        <div className="containerGlobal">
             <div className={styles.searchContainer}>
                <input type="text" placeholder="Pesquisar" id="search-input" className={styles.input} />
                <button type="button" className={styles.button}>
                    <MdSearch className={styles.icone} />
                </button>
            </div>
        </div>
    );
}