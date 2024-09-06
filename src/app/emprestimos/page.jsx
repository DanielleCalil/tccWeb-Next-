import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import BarraPesquisa from "@/componentes/barraPesquisa/page";

const infoEmprestimo = {
    livro: {
        titulo: "O Diário de Anne Frank",
        autor: "Anne Frank",
        capa: "/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg"
    },
    usuario: "Clara Oliveira da Silva",
    dataEmprestimo: "12/03/2024",
    periodo: {
        inicio: "12/03/2024",
        fim: "27/03/2024"
    },
};

export default function Emprestimos() {
  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.emprestimo}>Empréstimos</h1>
        <BarraPesquisa />
        <div className={styles.container}>
          <div className={styles.lineSquare}>
            <div className={styles.inputContainer}>
              <div className={styles.infoBookReserva}>
                <Image
                  src={infoEmprestimo.livro.capa}
                  alt={infoEmprestimo.livro.titulo}
                  className={styles.imgReserva}
                  width={667}
                  height={1000}
                />
                <div className={styles.livroInfo}>
                  <p>{infoEmprestimo.livro.titulo}</p>
                  <p>Por: {infoEmprestimo.livro.autor}</p>
                </div>
              </div>
              <div className={styles.line}></div>
              <p className={styles.info}>Reservado por: {infoEmprestimo.usuario}</p>
              <p className={styles.info}>Reserva realizada no dia: {infoEmprestimo.dataEmprestimo}</p>
              <p className={styles.info}>Período da reserva: {infoEmprestimo.periodo.inicio} até {infoEmprestimo.periodo.fim}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
