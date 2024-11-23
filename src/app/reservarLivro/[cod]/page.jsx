"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

import styles from "./page.module.css";
import Calendario from "@/componentes/calendario/page";
import ModalConfirmar from "@/componentes/modalConfirmar/page";

export default function ReservarLivro({ params }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [dataReserva, setDataReserva] = useState("");
  const [infoLivro, setInfoLivro] = useState([]);
  const [exemplarSelecionado, setExemplarSelecionado] = useState({});
  const router = useRouter();
  const livroCod = parseInt(params.cod);

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = () => {
    closeModalConfirm();
    router.push("../reservas");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExemplarSelecionado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleRealizaReserva() {
    const dadosReserva = {
      usu_cod: user.cod,
      exe_cod: exemplarSelecionado.exe_cod,
      emp_data_emp: dataReserva,
      emp_data_devol: null,
      emp_devolvido: 0,
      func_cod: 49

    };
    
    try {
      const response = await api.post("/emp_cadastrar", dadosReserva);
      if (response.data.sucesso) {
        openModalConfirm();
      }
    } catch (error) {
      console.error(error.message);
      alert("Erro ao realizar a reserva!");
    }
  }

  useEffect(() => {
    if (!livroCod) return;

    async function handleCarregaLivro() {
      try {
        const response = await api.post("/rec_listar", { liv_cod: livroCod });
        setInfoLivro(response.data.dados || []);
      } catch (error) {
        alert(
          error.response?.data?.mensagem || "Erro ao carregar informações do livro."
        );
      }
    }

    handleCarregaLivro();
  }, [livroCod]);

  async function recebeData(dataIni) {
    setDataReserva(dataIni);
    try {
      const response = await api.post("/consulta_exemplares/:liv_cod", {
        liv_cod: livroCod,
        dataConsulta: dataIni,
      });
      if (response.data.sucesso) {
        setInfoLivro(response.data.dados);
      }
    } catch (error) {
      console.error("Erro ao consultar exemplares", error);
    }
  }

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.informacoes}>Reservar Livro</h1>
        <div className={styles.container}>
          <Calendario recebeData={recebeData} />
          <div className={styles.divInput}>
            <select
              id="exe_cod"
              name="exe_cod"
              value={exemplarSelecionado.exe_cod || ""}
              onChange={handleChange}
              className={styles.inputField}
            >
              <option value="" disabled style={{ color: "#999" }}>
                Selecione o exemplar
              </option>
              {Array.isArray(infoLivro) &&
                infoLivro.map((exemplar) => (
                  <option key={exemplar.exe_cod} value={exemplar.exe_cod}>
                    {`${exemplar.exe_cod} - ${exemplar.liv_nome} (${exemplar.liv_cod})`}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.editar}>
            <button
              type="submit"
              onClick={handleRealizaReserva}
              className={styles.reservButton}
              disabled={!exemplarSelecionado.exe_cod}
            >
              Finalizar reserva
            </button>
          </div>
        </div>
      </div>
      <ModalConfirmar
        show={showModalConfirm}
        onClose={closeModalConfirm}
        onConfirm={handleConfirm}
      />
    </main>
  );
}
