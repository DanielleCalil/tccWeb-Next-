"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenuOutline, IoHomeOutline, IoPersonOutline, IoTrailSignOutline, IoStarOutline, IoBookOutline, IoTodayOutline, IoNotificationsOutline, IoPhonePortraitOutline, IoInformationCircleOutline, IoLogOutOutline } from "react-icons/io5";

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
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoHomeOutline className={styles.tpicon} />
                        Início
                    </Link>

                    <Link
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoPersonOutline className={styles.tpicon} />
                        Perfil
                    </Link>

                    <Link
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoTrailSignOutline className={styles.tpicon} />
                        Seleção
                    </Link>

                    <Link
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoStarOutline className={styles.tpicon} />
                        Recomendações
                    </Link>

                    <Link
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoBookOutline className={styles.tpicon} />
                        Biblioteca
                    </Link>

                    <Link
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoTodayOutline className={styles.tpicon} />
                        Reservas
                    </Link>

                    <Link
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoNotificationsOutline className={styles.tpicon} />
                        Notificações
                    </Link>

                    <Link
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoPhonePortraitOutline className={styles.tpicon} />
                        Empréstimos
                    </Link>

                    <Link
                        href="/"
                        className={rota === "/" ? styles.active : ""}>
                        <IoInformationCircleOutline className={styles.tpicon} />
                        Informações
                    </Link>

                    <Link
                        href="/"
                        className={styles.sair}>
                        <IoLogOutOutline className={styles.tpiconSair} />
                        Sair
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
                    <IoHomeOutline className={styles.tpicon} />
                    Início
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <IoPersonOutline className={styles.tpicon} />
                    Perfil
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <IoTrailSignOutline className={styles.tpicon} />
                    Seleção
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <IoStarOutline className={styles.tpicon} />
                    Recomendações
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <IoBookOutline className={styles.tpicon} />
                    Biblioteca
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <IoTodayOutline className={styles.tpicon} />
                    Reservas
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <IoNotificationsOutline className={styles.tpicon} />
                    Notificações
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <IoPhonePortraitOutline className={styles.tpicon} />
                    Empréstimos
                </Link>
                <Link
                    href='/'
                    onClick={ativaMenu}
                    className={rota === '/' ? styles.active : ''}>
                    <IoInformationCircleOutline className={styles.tpicon} />
                    Informações
                </Link>
                <Link
                    href='/'
                    className={styles.sair}
                    onClick={ativaMenu}>
                    <IoLogOutOutline className={styles.tpiconSair} />
                    Sair
                </Link>
            </div>
        </div >
    );
}