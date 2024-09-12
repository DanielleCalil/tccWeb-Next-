"use client";
import React, { useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import 'antd/dist/reset.css'; // Importa o CSS do Ant Design
import styles from './page.module.css'; // Arquivo com os estilos personalizados
import Calendario from '@/componentes/calendario/page'; // Importa o componente Calendario

export default function ReservarLivro() {
  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.informacoes}>Reservar livro</h1>
        <div className={styles.container}>
          {/* Componente de calendário importado */}
          <Calendario />

          <Link href="/perfil/">
            <Button className={styles.reservButton} type="primary">
              Finalizar reserva
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
