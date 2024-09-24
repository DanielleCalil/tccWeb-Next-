"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

const situacao = [
  'Todos',
  'Ativo',
  'Pendente',
];

const searchOptions = [
  { value: 'usu_cad', label: 'Data de cadastro' },
  { value: 'usu_nome', label: 'Usuário' },
  { value: 'usu_rm', label: 'RM' },
];

export default function Solicitacao() {
  const [selectedSearchOption, setSelectedSearchOption] = useState('usu_cad');

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const router = useRouter();

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = () => {
    setShowModalConfirm(false); // Fecha o modal
    router.push('../solicitacao');
  };

  async function listaLivros() {
    const dados = { [selectedSearchOption]: livNome }; // Dinamicamente envia o campo baseado no radio button
    try {
      const response = await api.post('/livros', dados);
      console.log(response.data.dados);
      setBooks(response.data.dados);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem + '\n' + error.response.data.dados);
      } else {
        alert('Erro no front-end' + '\n' + error);
      }
    }
  }
  // console.log(livNome)

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.selecao}>Solicitações de usuários</h1>
        <BarraPesquisa />

        {/* Radio Buttons para selecionar o critério de pesquisa */}
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

        <div className={styles.situacaoButtons}>
          {situacao.map((status) => (
            <div
              className={styles.situacao}
              key={status}
              onClick={() => setSelectedGenre(status)}
            >
              <Image
                src={`/solicitacoes/${status.replace(/\s+/g, '_')}.png`}
                alt={status}
                width={512}
                height={512}
                className={styles.icon}
              />
              <p className={styles.textIcon}>{status}</p>
            </div>
          ))}
        </div>
        <div className={styles.container}>
          {infoUsuario.map((usuario) => (
            <div key={usuario.usu_rm} className={styles.lineSquare}>
              <div className={styles.inputContainer}>
                <p className={styles.info}>Cadastro realizado no dia: {usuario.usu_cad}</p>
                <p className={styles.info}>Nome: {usuario.usu_nome}</p>
                <p className={styles.info}>RM: {usuario.usu_rm}</p>
                <p className={styles.info}>E-mail: {usuario.usu_email}</p>
                <div className={styles.line}></div>
                <p className={styles.pUsuario}> Confirmar nível do usuário</p>
                <div className={styles.opcao}>
                  <select id="options" className={styles.selectInput} defaultValue="">
                    <option value="" disabled>
                      Selecione uma opção
                    </option>
                    <option value="funcionario(a)ADM">Funcionário(a) - ADM</option>
                    <option value="professor(a)">Professor(a)</option>
                    <option value="aluno(a)">Aluno(a)</option>
                  </select>
                  <button
                    type="submit"
                    onClick={openModalConfirm}
                    className={styles.confirmButton}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          ))}
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
