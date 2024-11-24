"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import BarraPesquisa from "@/componentes/barraPesquisa/page";
import api from "@/services/api";

const searchOptions = [
  { value: "usu_nome", label: "Usuário" },
  { value: "emp_data_emp", label: "Data da Reserva" },
  { value: "liv_nome", label: "Livro" },
  { value: "aut_nome", label: "Autor" },
];

export default function Emprestimos() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

  const imageLoader = ({ src, width, quality }) => {
    return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
  };

  const [selectedSearchOption, setSelectedSearchOption] = useState("usu_nome");
  const [emprestimo, setEmprestimo] = useState([]);
  const [livNome, setLivNome] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(listaLivros, 300);
    return () => clearTimeout(timeoutId);
  }, [livNome, selectedSearchOption]);

  async function listaLivros() {
    const dados = { [selectedSearchOption]: livNome };
    try {
      const response = await api.post("/emprestimos", dados);
      setEmprestimo(Array.isArray(response.data.dados) ? response.data.dados : []);
    } catch (error) {
      alert(error.response?.data?.mensagem || "Erro ao buscar empréstimos.");
    }
  }

  async function cancelarReserva(emp_cod) {
    try {
      // Atualize a chamada da API para incluir o emp_cod
      const response = await api.patch(`/res_cancelar/${emp_cod}`);

      // Recarregar a lista de reservas do servidor
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        listaLivros(user.cod); // Recarrega reservas do usuário
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem || "Erro ao cancelar a reserva.");
      } else {
        alert("Erro ao conectar ao servidor.");
      }
    }
  }

  async function confirmarReserva(emp_cod) {
    try {
      // Atualize a chamada da API para incluir o emp_cod
      const response = await api.patch(`/emp_confirmar/${emp_cod}`);

      // Recarregar a lista de reservas do servidor
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        listaLivros(user.cod); // Recarrega reservas do usuário
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem || "Erro ao confirmar a reserva.");
      } else {
        alert("Erro ao conectar ao servidor.");
      }
    }
  }

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.emprestimo}>Empréstimos</h1>
        <BarraPesquisa livNome={livNome} atLivNome={setLivNome} listaLivros={listaLivros} />
        <div className={styles.searchOptions}>
          {searchOptions.map((option) => (
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
                  <p className={styles.info}>Curso: {emp.cur_nome}</p>
                  <p className={styles.info}>
                    Período da reserva: {emp.Empréstimo || "Data não disponível"} até{" "}
                    {emp.Devol_Prevista || "Data não disponível"}
                  </p>
                  <p className={styles.info}>Devolvido: {emp.Devolução || "Data não disponível"}</p>
                  <div className={styles.line}></div>
                  <div className={styles.contButton}>

                    <button
                      className={styles.confirmButton}
                      onClick={() => confirmarReserva(emp.emp_cod)}
                    >
                      Confirmar Reserva
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={() => cancelarReserva(emp.emp_cod)}
                    >
                      Cancelar Reserva
                    </button>

                  </div>
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