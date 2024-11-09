"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/services/api';

import styles from './page.module.css'; // Arquivo com os estilos personalizados
import Calendario from '@/componentes/calendario/page'; // Importa o componente Calendario
import ModalConfirmar from '@/componentes/modalConfirmar/page';

export default function ReservarLivro({ livroCod }) {

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const router = useRouter();

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = () => {
    setShowModalConfirm(false); // Fecha o modal
    router.push('../reservas');
  };

  const [infoLivro, setInfoLivro] = useState([]);

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

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.informacoes}>Reservar livro</h1>
        <div className={styles.container}>
          <Calendario />
          <div className={styles.editar}>
            <button
              type="submit"
              onClick={openModalConfirm}
              className={styles.reservButton}
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
