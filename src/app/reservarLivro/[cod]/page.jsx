"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/services/api';

import styles from './page.module.css'; // Arquivo com os estilos personalizados
import Calendario from '@/componentes/calendario/page'; // Importa o componente Calendario
import ModalConfirmar from '@/componentes/modalConfirmar/page';


export default function ReservarLivro({ params }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [dataReserva, setDataReserva] = useState('');

  const router = useRouter();
  const livroCod = parseInt(params.cod);

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = () => {
    setShowModalConfirm(false); // Fecha o modal
    router.push('../reservas');
  };

  const [infoLivro, setInfoLivro] = useState([]);
  const [exemplarSelecionado, setExemplarSelecionado] = useState(''); 

  async function handleRealizaReserva () {
    const dadosReserva = {
        "usu_cod": user.cod,
        "exe_cod": exemplarSelecionado.exe_cod,
        "emp_data_emp": dataReserva
    }; 

    try {
      const response = await api.post('/emp_cadastrar', dadosReserva); 
      if (response.data.sucesso) {
        openModalConfirm();
      }

    } catch (error) {
        console.log(error.message);
        
    }


  
  }

  useEffect(() => {
    if (!livroCod) return;

    async function handleCarregaLivro() {
      const dadosApi = {
        liv_cod: livroCod
      };

      try {
        const response = await api.post('/rec_listar', dadosApi);
        console.log("Resposta da API:", response);
        const infoApi = response.data.dados[0];
        setInfoLivro(infoApi);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.mensagem + '\n' + error.response.data.dados);
        } else {
          alert('Erro no front-end' + '\n' + error);
        }
      }
    }
    handleCarregaLivro();
  }, [livroCod]);
  

  async function recebeData(dataIni) {
    setDataReserva(dataIni);
    try {
      const response = await api.post('/consulta_exemplares', {
        "liv_cod": livroCod,
        "dataConsulta": dataIni
      });

      if (response.data.sucesso == true) {
        setInfoLivro(response.data.dados);
      }

    } catch (error) {
      console.log('erro');

    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExemplarSelecionado(prev => ({ ...prev, [name]: value }));
  };

  
  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.informacoes}>Reservar livro</h1>
        <div className={styles.container}>
          <Calendario recebeData={recebeData} />
          <div className={styles.divInput}>
            <select
              id="exe_cod"
              name="exe_cod"
              value={exemplarSelecionado}
              onChange={handleChange}
              className={styles.inputField}
            >
              <option value="" disabled style={{ color: '#999' }}>
                Selecione o exemplar
              </option>
              {Array.isArray(infoLivro) && infoLivro.map((exemplar) => (
                <option key={exemplar.liv_cod} value={exemplar.exe_cod}>
                  {`${exemplar.exe_cod} - ${exemplar.liv_nome} (${exemplar.liv_cod})`}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.editar}>
            <button
              type="submit"
              onClick={() => handleRealizaReserva()}
              className={styles.reservButton}
              disabled={!exemplarSelecionado}
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
