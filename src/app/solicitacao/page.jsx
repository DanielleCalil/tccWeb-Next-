"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import BarraPesquisa from "@/componentes/barraPesquisa/page";
import ModalConfirmar from '@/componentes/modalConfirmar/page';

const situacao = [
  'Ativo',
  'Inativo',
  'Pendente',
];

const searchOptions = [
  { value: 'usu_tipo', label: 'Tipo do usuário' },
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
  const [solicitacoesFiltradas, setSolicitacoesFiltradas] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [livNome, setlivNome] = useState('');
  const router = useRouter();

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = () => {
    console.log("Usuários selecionados:", Array.from(selectedUsers));
    setShowModalConfirm(false);
    router.push('../solicitacao');
  };

  const toggleUserSelection = (usu_cod) => {
    setSelectedUsers((prevSelectedUsers) => {
      const updatedSelection = new Set(prevSelectedUsers);
      if (updatedSelection.has(usu_cod)) {
        updatedSelection.delete(usu_cod);
      } else {
        updatedSelection.add(usu_cod);
      }
      return updatedSelection;
    });
  };

  function atLivNome(nome) {
    setlivNome(nome);
  }

  useEffect(() => {
    handleListaUsuarios();
  }, []);

  async function handleListaUsuarios() {
    try {
      const response = await api.get('/usuarios');
      setListaUsuarios(response.data.dados);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem + '\n' + error.response.data.dados);
      } else {
        alert('Erro no front-end' + '\n' + error);
      }
    }
  }

  // Função para filtrar as solicitações com base na situação selecionada
  const filtrarSolicitacoes = (situacao) => {
    const solicitacoesFiltradas = listaUsuarios.filter((solicit) => solicit.situacao === situacao);
    setSolicitacoesFiltradas(solicitacoesFiltradas);
  };

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.selecao}>Solicitações de usuários</h1>
        <BarraPesquisa livNome={livNome} atLivNome={atLivNome} listaLivros={handleListaUsuarios} />

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
          {situacao.map(status => (
            <div
              className={styles.situacao}
              key={status}
              onClick={() => filtrarSolicitacoes(status)}
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
            <option label="Funcionário(a) - ADM" value="2" />
            <option label="Professor(a)" value="1" />
            <option label="Aluno(a)" value="0" />
            <option label="Negar acesso" value="5" />
          </select>
          <button
            type="submit"
            onClick={openModalConfirm}
            className={styles.confirmButton}
          >
            Confirmar
          </button>
        </div>

        {/* Exibe as solicitações filtradas */}
        <div className={styles.container}>
          {solicitacoesFiltradas.length > 0 ? (
            solicitacoesFiltradas.map((solicit) => (
              <div key={solicit.usu_cod} className={styles.lineSquare}>
                <div className={styles.inputContainer}>
                  <p className={styles.info}>Nome: {solicit.usu_nome}</p>
                  <p className={styles.info}>RM: {solicit.usu_rm}</p>
                  <p className={styles.info}>E-mail: {solicit.usu_email}</p>
                  <p className={styles.info}>Curso técnico ou médio: {solicit.cur_nome}</p>
                  <div className={styles.box}>
                    <input
                      type="checkbox"
                      id={`checkbox-${solicit.usu_cod}`}
                      checked={selectedUsers.has(solicit.usu_cod)}
                      onChange={() => toggleUserSelection(solicit.usu_cod)}
                    />
                    <label htmlFor={`checkbox-${solicit.usu_cod}`} className={styles.customCheckbox}></label>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>Não há resultados para a requisição</h1>
          )}
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
