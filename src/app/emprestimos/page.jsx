"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import BarraPesquisa from "@/componentes/barraPesquisa/page";
import api from '@/services/api';

const searchOptions = [
  { value: 'usu_nome', label: 'Usuário' },
  { value: 'emp_data_emp', label: 'Data da reserva' },
  { value: 'liv_nome', label: 'Livro' },
  { value: 'aut_nome', label: 'Autor' },
];

export default function Emprestimos() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

  const imageLoader = ({ src, width, quality }) => {
    return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
  };

  const [selectedSearchOption, setSelectedSearchOption] = useState('usu_nome');
  const [emprestimo, setEmprestimo] = useState([]); // Verifique se isso está definido corretamente
  const [livNome, setLivNome] = useState('');

  const atLivNome = (nome) => {
    setLivNome(nome);
  };

  useEffect(() => {
    listaLivros(); // Buscar dados quando o componente montar
  }, []);

  async function listaLivros() {
    const dados = { [selectedSearchOption]: livNome };
    try {
      const response = await api.post('/emprestimos', dados);
      console.log(response.data.dados);
      setEmprestimo(response.data.dados || []); // Altere conforme necessário para acessar o array correto
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
          {emprestimo.length > 0 ? (
            emprestimo.map((emp) => (
              <div key={emp.usu_cod} className={styles.lineSquare}>
                <div className={styles.inputContainer}>
                  <div className={styles.infoBookReserva}>
                    <Image
                      loader={imageLoader}
                      src={emp.liv_foto_capa}
                      alt={emp.liv_nome}
                      className={styles.imgReserva}
                      width={667}
                      height={1000}
                    />
                    <div className={styles.livroInfo}>
                      <p>{emp.liv_nome}</p>
                      <p>Por: {emp.aut_nome}</p>
                    </div>
                  </div>
                  <div className={styles.line}></div>
                  <p className={styles.info}>Reservado por: {emp.usu_nome}</p>
                  <p className={styles.info}>Reserva realizada no dia: {emp.emp_data_emp}</p>
                  {/* Entender sobre as datas */}
                  <p className={styles.info}>Período da reserva: {emp.periodo?.inicio || 'Data não disponível'} até {emp.periodo?.fim || 'Data não disponível'}</p>
                </div>
              </div>
            ))
          ) : (
            <h1>Não há resultados para a requisição</h1>
          )}
        </div>
      </div>
    </main>
  );
}
