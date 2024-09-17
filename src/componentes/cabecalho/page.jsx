"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenuOutline, IoHomeOutline, IoPersonOutline, IoTrailSignOutline, IoStarOutline, IoBookOutline, IoTodayOutline, IoNotificationsOutline, IoPhonePortraitOutline, IoInformationCircleOutline, IoLogOutOutline } from "react-icons/io5";

import styles from './page.module.css';
import Image from 'next/image';

import listaTelas from '@/rotas/semCabRod';

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

    function validaCabRod() {
        let valida = false;
        listaTelas.forEach((tela) => {
            if (tela === rota) {
                valida = true
            }
        });
        return valida;
    }

    if (validaCabRod() === true) {
        return (<></>)
    }

    return (
        <header className={styles.containerNav}>
            <div className={styles.menu}>
                <div className={styles.retangGreen}>
                    <div className={styles.menuMobile}>
                        <IoMenuOutline onClick={ativaMenu} className={styles.icon} id="logo" />
                    </div>
                    <Image
                        src="/imagens_telas/logo.png"
                        width={509}
                        height={420}
                        className={styles.imgLogo}
                        alt="Logo projeto"
                        priority={true}
                    />
                    <Image
                        src="/imagens_telas/etec.png"
                        width={174}
                        height={80}
                        className={styles.imgEtec}
                        alt="Logo Etec"
                        priority={true}
                    />
                </div>
                <div className={styles.retangOrange}></div>

                <nav className={styles.menuGrande}>
                    <Link
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoHomeOutline className={styles.tpicon} />
                        Início
                    </Link>
                    <Link
                        href="/perfil"
                        className={rota === "/perfil" || rota === "/perfilEditar" ? styles.active : ""}>
                        <IoPersonOutline className={styles.tpicon} />
                        Perfil
                    </Link>
                    <Link
                        href="/selecao"
                        className={rota === "/selecao" ? styles.active : ""}>
                        <IoTrailSignOutline className={styles.tpicon} />
                        Seleção
                    </Link>
                    <Link
                        href="/recomendacoes"
                        className={rota === "/recomendacoes" || rota === "/infoLivroRecomendacao" ? styles.active : ""}>
                        <IoStarOutline className={styles.tpicon} />
                        Recomendações
                    </Link>
                    <Link
                        href="/biblioteca"
                        className={rota === "/biblioteca" ||
                            rota === "/infoLivroBiblioteca" ||
                            rota === "/editarInfoLivro" ||
                            rota === "/gerenciarLivroExistente" ||
                            rota === "/reservarLivro" ||
                            rota === "/addLivroNovo" ? styles.active : ""}>
                        <IoBookOutline className={styles.tpicon} />
                        Biblioteca
                    </Link>
                    <Link
                        href="/reservas"
                        className={rota === "/reservas" ? styles.active : ""}>
                        <IoTodayOutline className={styles.tpicon} />
                        Reservas
                    </Link>
                    {/* <Link
                        href="/notificacoes"
                        className={rota === "/notificacoes" ? styles.active : ""}> -tela excluída-
                        <IoNotificationsOutline className={styles.tpicon} />
                        Notificações
                    </Link> */}
                    <Link
                        href="/emprestimos"
                        className={rota === "/emprestimos" ? styles.active : ""}>
                        <IoPhonePortraitOutline className={styles.tpicon} />
                        Empréstimos
                    </Link>
                    <Link
                        href="/infoContato"
                        className={rota === "/infoContato" || rota === "/infoContatoEditar" ? styles.active : ""}>
                        <IoInformationCircleOutline className={styles.tpicon} />
                        Informações
                    </Link>
                    <Link
                        href="/usuarios/login"
                        className={styles.sairMenuGrande}>
                        <IoLogOutOutline className={styles.tpiconSair} />
                        Sair
                    </Link>
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
                    <IoHomeOutline className={styles.tpicon} />
                    Início
                </Link>
                <Link
                    href='/perfil'
                    onClick={ativaMenu}
                    className={rota === '/perfil' ? styles.active : ''}>
                    <IoPersonOutline className={styles.tpicon} />
                    Perfil
                </Link>
                <Link
                    href='/selecao'
                    onClick={ativaMenu}
                    className={rota === '/selecao' ? styles.active : ''}>
                    <IoTrailSignOutline className={styles.tpicon} />
                    Seleção
                </Link>
                <Link
                    href='/recomendacoes'
                    onClick={ativaMenu}
                    className={rota === '/recomendacoes' ? styles.active : ''}>
                    <IoStarOutline className={styles.tpicon} />
                    Recomendações
                </Link>
                <Link
                    href='/biblioteca'
                    onClick={ativaMenu}
                    className={rota === '/biblioteca' ? styles.active : ''}>
                    <IoBookOutline className={styles.tpicon} />
                    Biblioteca
                </Link>
                <Link
                    href='/reservas'
                    onClick={ativaMenu}
                    className={rota === '/reservas' ? styles.active : ''}>
                    <IoTodayOutline className={styles.tpicon} />
                    Reservas
                </Link>
                <Link
                    href='/notificacoes'
                    onClick={ativaMenu}
                    className={rota === '/notificacoes' ? styles.active : ''}>
                    <IoNotificationsOutline className={styles.tpicon} />
                    Notificações
                </Link>
                <Link
                    href='/emprestimos'
                    onClick={ativaMenu}
                    className={rota === '/emprestimos' ? styles.active : ''}>
                    <IoPhonePortraitOutline className={styles.tpicon} />
                    Empréstimos
                </Link>
                <Link
                    href='/infoContato'
                    onClick={ativaMenu}
                    className={rota === '/infoContato' ? styles.active : ''}>
                    <IoInformationCircleOutline className={styles.tpicon} />
                    Informações
                </Link>
                <Link
                    href='/usuarios/login'
                    className={styles.sairMobile}
                    onClick={ativaMenu}>
                    <IoLogOutOutline className={styles.tpiconSair} />
                    Sair
                </Link>
            </div>
        </header >
    );
}