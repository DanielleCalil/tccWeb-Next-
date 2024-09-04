"use client"
import styles from './page.module.css';
import { IoSearchOutline } from 'react-icons/io5';

export default function BarraPesquisa({ setSearchQuery }) {
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="containerGlobal">
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Pesquisar"
                    id="search-input"
                    className={styles.input}
                    onChange={handleSearchChange}
                />
                <button type="button" className={styles.button}>
                    <IoSearchOutline className={styles.icone} />
                </button>
            </div>
        </div>
    );
}
