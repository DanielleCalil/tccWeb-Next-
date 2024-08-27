"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenuOutline } from "react-icons/io5";

import styles from './index.module.css';
import Image from 'next/image';

export default function Cabecalho() {

    const [mobile, setMobile] = useState(false);

    const rota = usePathname();

    function ativaMenu() {
        if (mobile === false) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }

    return (
        <div className="containerGlobal">
            <div className={styles.navbar}>
                <div className={styles.retangGreen}>
                    <Image
                        src="/imagens_telas/logo.png"
                        width={509}
                        height={420}
                        className={styles.imgLogo}
                        alt="Logo"
                    />
                    <Image
                        src="/imagens_telas/etec.png"
                        width={174}
                        height={80}
                        className={styles.imgEtec}
                        alt="Etec"
                    />
                </div>
                <div className={styles.retangOrange}></div>

                <nav className={styles.menu}>
                    <Link
                        href="/telaInicial/"
                        className={rota === "/telaInicial/" ? styles.active : ""}>
                        <span className="material-symbols-outlined"></span>Início
                    </Link>

                    <Link
                        href="/perfil/"
                        className={rota === "/perfil/" ? styles.active : ""}>
                        <span className="material-symbols-outlined"></span>Perfil
                    </Link>

                    <Link
                        href="/selecao/"
                        className={rota === "/perfil/" ? styles.active : ""}>
                        <span className="material-symbols-outlined"></span>Seleção
                    </Link>

                    <Link
                        href="/recomendacao/"
                        className={rota === "/recomendacao/" ? styles.active : ""}>
                        <span className="material-symbols-outlined"></span>Recomendações
                    </Link>

                    <Link
                        href="/biblioteca/"
                        className={rota === "/biblioteca/" ? styles.active : ""}>
                        <span className="material-symbols-outlined"></span>Biblioteca
                    </Link>

                    <Link
                        href="/reservas/"
                        className={rota === "/reservas/" ? styles.active : ""}>
                        <span className="material-symbols-outlined"></span>Reservas
                    </Link>

                    <Link
                        href="/notificacoes/"
                        className={rota === "/notificacoes/" ? styles.active : ""}>
                        <span className="material-symbols-outlined"></span>Notificações
                    </Link>

                    <Link
                        href="/emprestimos/"
                        className={rota === "/perfil/" ? styles.active : ""}>
                        <span className="material-symbols-outlined"></span>Empréstimos
                    </Link>

                    <Link
                        href="/infoContato/"
                        className={rota === "/infoContato/" ? styles.active : ""}>
                        <span className="material-symbols-outlined"></span>Informações
                    </Link>

                    <Link
                        href="/login/"
                        className="sair">
                        <span className="material-symbols-outlined"></span>Sair
                    </Link>
                    <div className={styles.menuMobile}>
                        <IoMenuOutline onClick={ativaMenu} className={styles.icon} id="logo" />
                    </div>
                </nav>

            </div>
            <div
                className={mobile === false ? styles.menuMobileExpandidon : styles.menuMobileExpandidos}
                id="mostraOpMobile"
            >
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <span className="material-symbols-outlined"></span>Início
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <span className="material-symbols-outlined"></span>Perfil
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <span className="material-symbols-outlined"></span>Seleção
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <span className="material-symbols-outlined"></span>Recomendações
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <span className="material-symbols-outlined"></span>Biblioteca
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <span className="material-symbols-outlined"></span>Reservas
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <span className="material-symbols-outlined"></span>Notificações
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <span className="material-symbols-outlined"></span>Empréstimos
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <span className="material-symbols-outlined"></span>Informações
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}>
                    <span className="material-symbols-outlined"></span>Sair
                </Link>
            </div>
        </div >
    );
}