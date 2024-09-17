"use client";
import { useState } from "react";
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import BarraPesquisa from '@/componentes/barraPesquisa/page';

const infoReserva = [
    {
        livro: {
            liv_nome: "O Diário de Anne Frank",
            aut_nome: "Anne Frank",
            liv_foto_capa: "/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg"
        },
        usu_nome: "Clara Oliveira da Silva",
        dataReserva: "12/03/2024",
        periodo: {
            inicio: "12/03/2024",
            fim: "27/03/2024"
        },
    },
];

export default function Reservas() {

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Informações do livro reservado</h1>
                <BarraPesquisa />
                <div className={styles.container}>
                    {infoReserva.map((reserva, index) => (
                        <div key={index} className={styles.lineSquare}>
                            <div className={styles.inputContainer}>
                                <div className={styles.infoBookReserva}>
                                    <Image
                                        src={reserva.livro.liv_foto_capa}
                                        alt={reserva.livro.liv_nome}
                                        className={styles.imgReserva}
                                        width={200}
                                        height={300}
                                    />
                                    <div className={styles.livroInfo}>
                                        <p>{reserva.livro.liv_nome}</p>
                                        <p>Por: {reserva.livro.aut_nome}</p>
                                    </div>
                                </div>
                                <div className={styles.line}></div>
                                <p className={styles.info}>Reservado por: {reserva.usu_nome}</p>
                                <p className={styles.info}>Reserva realizada no dia: {reserva.dataReserva}</p>
                                <p className={styles.info}>Período da reserva: {reserva.periodo?.inicio} até {reserva.periodo?.fim || 'Data não disponível'}</p>
                                <div className={styles.line}></div>
                                <p className={styles.pUsuario}>Confirmar retirada do livro</p>
                                <div className={styles.opcao}>
                                    <button
                                        type="button"
                                        className={styles.confirmButton}>
                                        Retirada confirmada
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.cancelButton}>
                                        Cancelar retirada
                                    </button>
                                </div>
                                <p className={styles.obs}>
                                    OBS: se após 3 dias da data inicial da reserva não for declarada nenhuma informação a respeito da retirada,
                                    a reserva será automaticamente cancelada.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
