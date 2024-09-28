"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import BarraPesquisa from "@/componentes/barraPesquisa/page";
import api from '@/services/api';

// const infoEmprestimo = [
//   {
//     livro: {
//       liv_nome: "O Diário de Anne Frank",
//       aut_nome: "Anne Frank",
//       liv_foto_capa: "/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg"
//     },
//     usu_nome: "Clara Oliveira da Silva",
//     emp_data_emp: "12/03/2024",
//     periodo: {
//       inicio: "12/03/2024",
//       fim: "27/03/2024"
//     },
//   },
// ];

const searchOptions = [
  { value: 'usu_nome', label: 'Usuário' },
  { value: 'Empréstimo', label: 'Data da reserva' },
  { value: 'liv_nome', label: 'Livro' },
  { value: 'aut_nome', label: 'Autor' },
];

export default function Emprestimos() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

  const imageLoader = ({ src, width, quality }) => {
    return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
  }

  const [selectedSearchOption, setSelectedSearchOption] = useState('usu_nome');
  const [emprestimo, setEmprestimo] = useState([]);

  const [livNome, setlivNome] = useState('')

  function atLivNome(nome) {
    setlivNome(nome)
  }

  useEffect(() => {
    listaLivros();
  }, []);

  async function listaLivros() {
    const dados = { [selectedSearchOption]: livNome };
    try {
      const response = await api.post('/emprestimos', dados);
      console.log(response.data.dados);
      setEmprestimo(response.data.dados);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem + '\n' + error.response.data.dados);
      } else {
        alert('Erro no front-end' + '\n' + error);
      }
    }
  }


  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.emprestimo}>Empréstimos</h1>
        <BarraPesquisa livNome={livNome} atLivNome={atLivNome} listaLivros={listaLivros} />

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
          {emprestimo.map(liv => (
            <div key={liv.usu_nome} className={styles.lineSquare}>
              <div className={styles.inputContainer}>
                <div className={styles.infoBookReserva}>
                  <Image
                    loader={imageLoader}
                    src={liv.liv_foto_capa}
                    alt={liv.liv_nome}
                    className={styles.imgReserva}
                    width={667}
                    height={1000}
                  />
                  <div className={styles.livroInfo}>
                    <p>{liv.liv_nome}</p>
                    <p>Por: {liv.aut_nome}</p>
                  </div>
                </div>
                <div className={styles.line}></div>
                <p className={styles.info}>Reservado por: {liv.usu_nome}</p>
                <p className={styles.info}>Reserva realizada no dia: {liv.Empréstimo}</p>
                <p className={styles.info}>Período da reserva: {liv.periodo?.inicio || 'Data não disponível'} até {liv.periodo?.fim || 'Data não disponível'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
