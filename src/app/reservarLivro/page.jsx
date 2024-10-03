"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './page.module.css'; // Arquivo com os estilos personalizados
import Calendario from '@/componentes/calendario/page'; // Importa o componente Calendario
import ModalConfirmar from '@/componentes/modalConfirmar/page';

export default function ReservarLivro() {

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const router = useRouter();

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = () => {
    setShowModalConfirm(false); // Fecha o modal
    router.push('../reservas');
  };

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
