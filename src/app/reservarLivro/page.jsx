"use client";
import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import 'antd/dist/reset.css'; // Importa o CSS do Ant Design
import styles from './page.module.css'; // Arquivo com os estilos personalizados

const { RangePicker } = DatePicker;

export default function ReservarLivro() {
  const [dates, setDates] = useState([]);
  const today = new Date();

  const handleDateChange = (values) => {
    setDates(values || []);
  };

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.informacoes}>Reservar livro</h1>
        <div className={styles.container}>
          <div className={styles.calendarContainer}>
            <RangePicker
              onChange={handleDateChange}
              format='DD/MM/YYYY'
              locale={ptBR}
              disabledDate={(current) => current && current < today}
            />
            <div className={styles.datePickers}>
              <div>
                <label>Reservar de:</label>
                <input
                  type="text"
                  value={dates[0] ? format(dates[0].toDate(), 'dd/MM/yyyy', { locale: ptBR }) : ''}
                  readOnly
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.datePickers}>
              <div>
                <label>Até:</label>
                <input
                  type="text"
                  value={dates[1] ? format(dates[1].toDate(), 'dd/MM/yyyy', { locale: ptBR }) : ''}
                  readOnly
                  className={styles.input}
                />
              </div>
            </div>
            <Link href="/perfil/">
              <Button className={styles.reservButton} type="primary">
                Finalizar reserva
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
