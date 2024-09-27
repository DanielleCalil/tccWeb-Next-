"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import BarraPesquisa from "@/componentes/barraPesquisa/page";
import ModalConfirmar from '@/componentes/modalConfirmar/page';

// const infoUsuario = [
//   {
//     usu_nome: 'Clara Oliveira da Silva',
//     usu_email: 'clara.oliveira.silva@example.com',
//     usu_rm: '550726',
//     usu_cad: '13/03/2024',
//   },
//   {
//     usu_nome: 'Ana Beatriz Silva',
//     usu_email: 'ana.silva@example.com',
//     usu_rm: '782134',
//     usu_cad: '15/03/2024',
//   },
//   {
//     usu_nome: 'Ana Carolina Silva',
//     usu_email: 'ana.carolina@exemplo.com',
//     usu_rm: '483726',
//     usu_cad: '18/03/2024',
//   }
// ];

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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

  const imageLoader = ({ src, width, quality }) => {
    return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
  }

  const [selectedSearchOption, setSelectedSearchOption] = useState('usu_cad');
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [selectedUsuario, setSelectedUsuario] = useState('Todos');
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const router = useRouter();

  const [solicita, setSolicita] = useState([])

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = () => {
    // Aqui você pode lidar com a lógica de atribuição de nível de acesso
    console.log("Usuários selecionados:", Array.from(selectedUsers));
    setShowModalConfirm(false); // Fecha o modal
    router.push('../solicitacao');
  };

  const toggleUserSelection = (usu_rm) => {
    const updatedSelection = new Set(selectedUsers);
    if (updatedSelection.has(usu_rm)) {
      updatedSelection.delete(usu_rm); // Remove o usuário se já estiver selecionado
    } else {
      updatedSelection.add(usu_rm); // Adiciona o usuário se não estiver selecionado
    }
    setSelectedUsers(updatedSelection);
  };

  const [livNome, setlivNome] = useState('')

  function atLivNome(nome) {
    setlivNome(nome)
  }

  useEffect(() => {
    listaLivros();
  }, []);

  async function listaLivros() {
    const dados = { [selectedSearchOption]: livNome };
    try {
      const response = await api.post('/sol_listar', dados);
      console.log(response.data.dados);
      setSolicita(response.data.dados);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem + '\n' + error.response.data.dados);
      } else {
        alert('Erro no front-end' + '\n' + error);
      }
    }
  }

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
              onClick={() => setSelectedUsuario(status)}
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

        <div className={styles.container}>
          {solicita.map(solicit => (
            <div key={solicit.usu_rm} className={styles.lineSquare}>
              <div className={styles.inputContainer}>

                <p className={styles.info}>Cadastro realizado no dia: {solicit.usu_cad}</p>
                <p className={styles.info}>Nome: {solicit.usu_nome}</p>
                <p className={styles.info}>RM: {solicit.usu_rm}</p>
                <p className={styles.info}>E-mail: {solicit.usu_email}</p>
                <div className={styles.box}>
                  <input
                    type="checkbox"
                    id={`checkbox-${solicit.usu_rm}`} // Adiciona um ID único
                    checked={selectedUsers.has(solicit.usu_rm)}
                    onChange={() => toggleUserSelection(solicit.usu_rm)}
                  />
                  <label htmlFor={`checkbox-${solicit.usu_rm}`} className={styles.customCheckbox}></label> {/* Checkbox personalizado */}
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
