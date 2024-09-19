"use client";
import Link from 'next/link';
import styles from './page.module.css';
import { usePathname } from 'next/navigation';

import listaTelas from '@/rotas/semCabRod';

export default function Rodape() {
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
        <div className={styles.container}>
            <div className="containerGlobal">
                <footer className={styles.footer}>
                    <div className={styles.conteudo}>
                        Desenvolvido por <Link href="/usuarios/sobreNos">Danikawari</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}