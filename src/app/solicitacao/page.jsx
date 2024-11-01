'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import BarraPesquisa from "@/componentes/barraPesquisa/page";
import ModalConfirmar from '@/componentes/modalConfirmar/page';

const situacaoOptions = [
  { value: 'Aprovados', label: 'Aprovados' },
  { value: 'Reprovados', label: 'Reprovados' },
  { value: 'Pendentes', label: 'Pendentes' },
];

const searchOptions = [
  { value: 'usu_tipo', label: 'Tipo do usuário' },
  { value: 'usu_nome', label: 'Usuário' },
  { value: 'usu_rm', label: 'RM' },
];

export default function Solicitacao() {
  const router = useRouter();
  const [selectedSearchOption, setSelectedSearchOption] = useState('usu_cod');
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [usuarioTipo, setUsuarioTipo] = useState("");
  const [solicitacoesFiltradas, setSolicitacoesFiltradas] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [filtroSituacao, setFiltroSituacao] = useState('');

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = async () => {
    if (selectedUsers.size === 0) {
      alert("Nenhum usuário selecionado. Por favor, selecione um usuário antes de confirmar.");
      return;
    }

    if (!usuarioTipo) {
      alert("Por favor, selecione um nível de acesso.");
      return;
    }

    const updatedData = Array.from(selectedUsers).map((usu_cod) => ({
      usu_cod,
      usu_tipo: parseInt(usuarioTipo),
      usu_ativo: 1,
      usu_aprovado: 1,
    }));

    try {
      await api.patch('/analizarUcu', { usuarios: updatedData });
      setShowModalConfirm(false);
      setSelectedUsers(new Set()); // Limpa a seleção após a confirmação
      setUsuarioTipo(""); // Limpa o tipo selecionado
    } catch (error) {
      alert("Erro ao atualizar usuários. Por favor, tente novamente.");
      console.error(error);
    }
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

  useEffect(() => {
    async function fetchUsuariosPendentes() {
      try {
        const response = await api.post('/usu_pendentes');
        const usuarios = response.data.dados;
        setListaUsuarios(usuarios);
        setSolicitacoesFiltradas(usuarios);
      } catch (error) {
        alert('Erro ao buscar usuários pendentes.');
      }
    }
    fetchUsuariosPendentes();
  }, []);

  const filtrarSolicitacoes = (situacaoOptions) => {
    const filtradas = listaUsuarios.filter((solicit) => {
      if (situacaoOptions === 'Aprovados') return solicit.usu_aprovado === 1; // Usuários Ativos
      if (situacaoOptions === 'Reprovados') return solicit.usu_tipo === 5; // Usuários Inativos
      if (situacaoOptions === 'Pendentes') return solicit.usu_aprovado === 0; // Usuários Pendentes
      return true; // Se não houver filtro, retorna nada
    });
    setSolicitacoesFiltradas(filtradas);
  };

  // Mudar o filtro de situação
  const handleFiltroChange = (event) => {
    const selectedSituation = event.target.value;
    setFiltroSituacao(selectedSituation);
    filtrarSolicitacoes(selectedSituation); // Aplica o filtro ao mudar
  };

  useEffect(() => {
    filtrarSolicitacoes(filtroSituacao);
  }, [listaUsuarios, filtroSituacao]); // Refiltra sempre que lista de usuários ou filtro mudar

  const [livNome, setlivNome] = useState('');

  function atLivNome(nome) {
    setlivNome(nome);
  }

  useEffect(() => {
    listaLivros();
  }, []);

  async function listaLivros() {
    const dados = { [selectedSearchOption]: livNome };
    try {
      const response = await api.post("/usuarios", dados);
      console.log(response.data.dados);
      setListaUsuarios(response.data.dados);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem + "\n" + error.response.data.dados);
      } else {
        alert("Erro no front-end" + "\n" + error);
      }
    }
  }

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.selecao}>Solicitações de usuários</h1>
        <BarraPesquisa livNome={livNome} atLivNome={atLivNome} listaLivros={listaLivros} />

        {/* Radio Buttons para selecionar o critério de pesquisa */}
        <div className={styles.searchOptions}>
          {searchOptions.map(option => (
            <label key={option.value}>
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

        {/* Botões de Filtro de Situação */}
        <div className={styles.situacaoButtons}>
          {situacaoOptions.map(status => (
            <div
              key={status.value}
              className={`${styles.situacao} ${filtroSituacao === status.value ? styles.active : ''}`}
              onClick={() => handleFiltroChange({ target: { value: status.value } })}
            >
              <Image
                src={`/solicitacoes/${status.value.replace(/\s+/g, '_')}.png`}
                alt={status.label}
                width={512}
                height={512}
                className={styles.icon}
              />
              <p className={styles.textIcon}>{status.label}</p>
            </div>
          ))}
        </div>

        <div className={styles.opcao}>
          <select
            className={styles.selectInput}
            value={usuarioTipo}
            onChange={(e) => setUsuarioTipo(e.target.value)}
          >
            <option value="" disabled>Selecione uma opção</option>
            <option value="2">Funcionário(a) - ADM</option>
            <option value="1">Professor(a)</option>
            <option value="0">Aluno(a)</option>
            <option value="5">Acesso negado</option>
          </select>
          <button type="submit" onClick={openModalConfirm} className={styles.confirmButton}>
            Confirmar
          </button>
        </div>

        {/* Exibe as solicitações filtradas */}
        <div className={styles.container}>

          {solicitacoesFiltradas.length > 0 ? (
            solicitacoesFiltradas.map((solicit) => (
              <div key={solicit.usu_cod} className={styles.lineSquare}>
                <div className={styles.inputContainer}>
                  <p className={styles.info}>  Nome: {solicit.usu_nome}</p>
                  <p className={styles.info}>  RM: {solicit.usu_rm}</p>
                  <p className={styles.info}>  E-mail: {solicit.usu_email}</p>
                  <p className={styles.info}>  Curso técnico ou médio: {solicit.cur_nome}</p>
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
        <ModalConfirmar
          show={showModalConfirm}
          onClose={closeModalConfirm}
          onConfirm={handleConfirm}
          mensagem="Tem certeza que deseja aprovar as solicitações?"
        />
      </div>
    </main>
  );
}
