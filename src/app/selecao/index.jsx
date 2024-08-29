import Image from "next/image";
import styles from "./index.module.css";
import Link from 'next/link';

import BarraPesquisa from "@/componentes/barraPesquisa";

export default function Selecao() {
  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.selecao}>Seleção de usuários</h1>
        <BarraPesquisa />
        <div className={styles.container}>
          <div className={styles.lineSquare}>
            <div className={styles.inputContainer}>
              <p className={styles.info}>Cadastro realizado no dia: 12/03/2024</p>
              <p className={styles.info}>Nome: Clara Oliveira da Silva</p>
              <p className={styles.info}>RM: 550726</p>
              <p className={styles.info}>E-mail: clara.oliveira.silva@example.com</p>
              <div className={styles.line}></div>
              <p className={styles.pUsuario}> Confirmar nível do usuário</p>
              <div className={styles.opcao}>
                <select id="options" className={styles.selectInput}>
                  <option
                    value=""
                    disabled selected
                  >
                    Selecione uma opção
                  </option>
                  <option value="funcionario(a)ADM">
                    Funcionário(a) - ADM
                  </option>
                  <option value="professor(a)">
                    Professor(a)
                  </option>
                  <option value="aluno(a)">
                    Aluno(a)
                  </option>
                </select>
                <button type="submit" className={styles.confirmButton}>Confirmar</button>
              </div>
            </div>
          </div>
          <div className={styles.lineSquare}>
            <div className={styles.inputContainer}>
              <p className={styles.info}>Cadastro realizado no dia: 15/03/2024</p>
              <p className={styles.info}>Nome: Ana Beatriz Silva</p>
              <p className={styles.info}>RM: 782134</p>
              <p className={styles.info}>E-mail: ana.silva@example.com</p>
              <div className={styles.line}></div>
              <p className={styles.pUsuario}> Confirmar nível do usuário</p>
              <div className={styles.opcao}>
                <select id="options" className={styles.selectInput}>
                  <option
                    value=""
                    disabled selected
                  >
                    Selecione uma opção
                  </option>
                  <option value="funcionario(a)ADM">
                    Funcionário(a) - ADM
                  </option>
                  <option value="professor(a)">
                    Professor(a)
                  </option>
                  <option value="aluno(a)">
                    Aluno(a)
                  </option>
                </select>
                <button type="submit" className={styles.confirmButton}>Confirmar</button>
              </div>
            </div>
          </div>
          <div className={styles.lineSquare}>
            <div className={styles.inputContainer}>
              <p className={styles.info}>Cadastro realizado no dia: 18/03/2024</p>
              <p className={styles.info}>Nome: Ana Carolina Silva</p>
              <p className={styles.info}>RM: 483726</p>
              <p className={styles.info}>E-mail: ana.carolina@exemplo.com</p>
              <div className={styles.line}></div>
              <p className={styles.pUsuario}> Confirmar nível do usuário</p>
              <div className={styles.opcao}>
                <select id="options" className={styles.selectInput}>
                  <option
                    value=""
                    disabled selected
                  >
                    Selecione uma opção
                  </option>
                  <option value="funcionario(a)ADM">
                    Funcionário(a) - ADM
                  </option>
                  <option value="professor(a)">
                    Professor(a)
                  </option>
                  <option value="aluno(a)">
                    Aluno(a)
                  </option>
                </select>
                <button type="submit" className={styles.confirmButton}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}