"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

import BarraPesquisa from "@/componentes/barraPesquisa/page";
import ModalConfirmar from '@/componentes/modalConfirmar/page';

const infoUsuario = [
  {
    usu_nome: 'Clara Oliveira da Silva',
    usu_email: 'clara.oliveira.silva@example.com',
    usu_rm: '550726',
    usu_cad: '13/03/2024',
  },
  {
    usu_nome: 'Ana Beatriz Silva',
    usu_email: 'ana.silva@example.com',
    usu_rm: '782134',
    usu_cad: '15/03/2024',
  },
  {
    usu_nome: 'Ana Carolina Silva',
    usu_email: 'ana.carolina@exemplo.com',
    usu_rm: '483726',
    usu_cad: '18/03/2024',
  }
];

export default function Selecao() {

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => {
    setShowModalConfirm(false);
    onClose();
  };

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.selecao}>Seleção de usuários</h1>
        <BarraPesquisa />
        <div className={styles.container}>
          {infoUsuario.map((usuario, index) => (
            <div key={index} className={styles.lineSquare}>
              <div className={styles.inputContainer}>
                <p className={styles.info}>Cadastro realizado no dia: {usuario.usu_cad}</p>
                <p className={styles.info}>Nome: {usuario.usu_nome}</p>
                <p className={styles.info}>RM: {usuario.usu_rm}</p>
                <p className={styles.info}>E-mail: {usuario.usu_email}</p>
                <div className={styles.line}></div>
                <p className={styles.pUsuario}> Confirmar nível do usuário</p>
                <div className={styles.opcao}>
                  <select id="options" className={styles.selectInput}>
                    <option value="" disabled selected>
                      Selecione uma opção
                    </option>
                    <option value="funcionario(a)ADM">Funcionário(a) - ADM</option>
                    <option value="professor(a)">Professor(a)</option>
                    <option value="aluno(a)">Aluno(a)</option>
                  </select>
                  <button type="submit" onClick={openModalConfirm} className={styles.confirmButton}>
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalConfirmar show={showModalConfirm} onClose={closeModalConfirm} />
    </main>
  );
}
