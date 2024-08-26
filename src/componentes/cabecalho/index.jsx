import Link from 'next/link';
import styles from './index.module.css';
import Image from 'next/image';

export default function Cabecalho () {
    return (
        <div className="containerGlobal">
            <div className={styles.header}>
                    <div className={styles.retangGreen}>
                        <Image src="/imagens_telas/logo.png" width={1709} height={379} className={styles.imgLogo} alt="Logo" />
                        <Image src="/imagens_telas/etec.png" width={1709} height={379} className={styles.imgEtec} alt="Etec" />
                    </div>
                    <div className={styles.retangOrange}></div>
                <nav className={styles.navbar}>
                    <ul>
                        <li>
                            <Link href="/telaInicial/"><span className="material-symbols-outlined">home</span>Início</Link>
                        </li>
                        <li>
                            <Link href="/perfil/"><span className="material-symbols-outlined">person</span>Perfil</Link>
                        </li>
                        <li>
                            <Link href="/selecao/"><span className="material-symbols-outlined">signpost</span>Seleção</Link>
                        </li>
                        <li>
                            <Link href="/recomendacao/"><span className="material-symbols-outlined">star</span>Recomendações</Link>
                        </li>
                        <li>
                            <Link href="/biblioteca/" className="active"><span className="material-symbols-outlined">menu_book</span>Biblioteca</Link>
                        </li>
                        <li>
                            <Link href="/reservas/"><span className="material-symbols-outlined">calendar_month</span>Reservas</Link>
                        </li>
                        <li>
                            <Link href="/notificacoes/"><span className="material-symbols-outlined">notifications</span>Notificações</Link>
                        </li>
                        <li>
                            <Link href="/emprestimos/"><span className="material-symbols-outlined">book_2</span>Empréstimos</Link>
                        </li>
                        <li>
                            <Link href="/infoContato/"><span className="material-symbols-outlined">info</span>Informações</Link>
                        </li>
                        <li>
                            <Link href="/login/" className="sair"><span className="material-symbols-outlined">logout</span>Sair</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}