"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import BarraPesquisa from "@/componentes/barraPesquisa/page";

const infoEmprestimo = [
  {
    livro: {
      liv_nome: "O Diário de Anne Frank",
      aut_nome: "Anne Frank",
      liv_foto_capa: "/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg"
    },
    usu_nome: "Clara Oliveira da Silva",
    dataEmprestimo: "12/03/2024",
    periodo: {
      inicio: "12/03/2024",
      fim: "27/03/2024"
    },
  },
];

const searchOptions = [
  { value: 'usu_nome', label: 'Usuário' },
  { value: 'dataEmprestimo', label: 'Data da reserva' },
  { value: 'liv_nome', label: 'Livro' },
  { value: 'aut_nome', label: 'Autor' },
];

export default function Emprestimos() {

  const [selectedSearchOption, setSelectedSearchOption] = useState('usu_nome');

  async function listaLivros() {
    const dados = { [selectedSearchOption]: livNome }; // Dinamicamente envia o campo baseado no radio button
    try {
      const response = await api.post('/livros', dados);
      console.log(response.data.dados);
      setBooks(response.data.dados);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem + '\n' + error.response.data.dados);
      } else {
        alert('Erro no front-end' + '\n' + error);
      }
    }
  }
  // console.log(livNome)

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.emprestimo}>Empréstimos</h1>
        <BarraPesquisa />

        {/* Radio Buttons para selecionar o critério de pesquisa */}
        <div className={styles.searchOptions}>
          {searchOptions.map(option => (
            <label key={option.value} className={styles.radioLabel}>
              <input
                type="radio"
                name="searchOption"
                value={option.value}
                checked={selectedSearchOption === option.value}
                onChange={() => setSelectedSearchOption(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className={styles.container}>
          {infoEmprestimo.map((emprestimo, index) => (
            <div key={index} className={styles.lineSquare}>
              <div className={styles.inputContainer}>
                <div className={styles.infoBookReserva}>
                  <Image
                    src={emprestimo.livro.liv_foto_capa}
                    alt={emprestimo.livro.liv_nome}
                    className={styles.imgReserva}
                    width={667}
                    height={1000}
                  />
                  <div className={styles.livroInfo}>
                    <p>{emprestimo.livro.liv_nome}</p>
                    <p>Por: {emprestimo.livro.aut_nome}</p>
                  </div>
                </div>
                <div className={styles.line}></div>
                <p className={styles.info}>Reservado por: {emprestimo.usu_nome}</p>
                <p className={styles.info}>Reserva realizada no dia: {emprestimo.dataEmprestimo}</p>
                <p className={styles.info}>Período da reserva: {emprestimo.periodo?.inicio} até {emprestimo.periodo?.fim || 'Data não disponível'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
