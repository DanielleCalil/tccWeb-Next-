'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import BarraPesquisa from "@/componentes/barraPesquisa/page";
import ModalConfirmar from '@/componentes/modalConfirmar/page';

const situacaoMap = {
  Aprovados: "Aprovado",
  Reprovados: 5,
  Pendentes: "Não Aprovado"
};

const situacaoOptions = [
  { value: 'Aprovados', label: 'Aprovados' },
  { value: 'Reprovados', label: 'Reprovados' },
  { value: 'Pendentes', label: 'Pendentes' }
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
  const [usuariosPendentes, setUsuariosPendentes] = useState([]);
  const [usuariosReprovados, setUsuariosReprovados] = useState([]);
  const [usuariosAprovados, setUsuariosAprovados] = useState([]);

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = async () => {
    event.preventDefault();

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
      usu_aprovado: 0,
    }));

    try {
      await api.patch('/usuc_aprovar', { usuarios: updatedData });
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
        updatedSelection.delete(usu_cod); // Remove o usuário se já estiver selecionado
      } else {
        updatedSelection.add(usu_cod); // Adiciona o usuário se não estiver selecionado
      }
      return updatedSelection;
    });
  };

  useEffect(() => {
    // Define uma função assíncrona para buscar as solicitações com base no filtro
    async function fetchSolicitacoes() {
      try {
        let response;
  
        if (filtroSituacao === "Reprovados") {
          // Busca solicitações reprovadas
          response = await api.post('/usu_reprovados');
          setUsuariosReprovados(response.data.dados);
        } else if (filtroSituacao === "Aprovados") {
          // Busca solicitações aprovadas
          response = await api.post('/usu_aprovados');
          setUsuariosAprovados(response.data.dados);
        } else {
          // Caso padrão: Pendentes
          response = await api.post('/usu_pendentes');
          setUsuariosPendentes(response.data.dados);
        }
  
        // Define as solicitações filtradas com base no filtro atual
        setSolicitacoesFiltradas(response.data.dados);
      } catch (error) {
        alert(`Erro ao buscar solicitações (${filtroSituacao}).`);
        console.error(`Erro ao buscar solicitações (${filtroSituacao}):`, error);
      }
    }
  
    fetchSolicitacoes();
  }, [filtroSituacao]); // Re-executa sempre que o filtro for alterado
  


  const filtrarSolicitacoes = (situacao) => {
    const situacaoFilter = situacaoMap[situacao];
    const filtradas = listaUsuarios.filter((solicit) => {
      if (situacao === "Aprovados") {
        return solicit.usu_aprovado === situacaoFilter;
      }
      if (situacao === "Reprovados") {
        return solicit.usu_tipo === situacaoFilter;
      }
      if (situacao === "Pendentes") {
        return solicit.usu_aprovado === situacaoFilter;
      }
      return false;
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
              onClick={() => setFiltroSituacao(status.value)}
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
        <form onSubmit={handleConfirm}>
          <div className={styles.opcao}>
            <select
              className={styles.selectInput}
              value={usuarioTipo}
              onChange={(e) => setUsuarioTipo(e.target.value)}
            >
              <option value="" disabled>Selecione uma opção</option>
              <option value="1">Professor(a)</option>
              <option value="0">Aluno(a)</option>
              <option value="5">Acesso negado</option>
            </select>
            <button type="submit" className={styles.confirmButton}>
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
                    <p className={styles.info}>  Curso técnico ou médio: {solicit.cursos && solicit.cursos.length > 0 ? solicit.cursos[0].cur_nome : 'Nenhum curso encontrado'}</p>
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
              <h1>Pressione algum dos filtros</h1>
            )}
          </div>
          <ModalConfirmar
            show={showModalConfirm}
            onClose={closeModalConfirm}
            onConfirm={handleConfirm}
            mensagem="Tem certeza que deseja aprovar as solicitações?"
          />
        </form>
      </div>
    </main>
  );
}
