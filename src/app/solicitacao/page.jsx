'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
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
  const router = useRouter();
  const [selectedSearchOption, setSelectedSearchOption] = useState('usu_cod');
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [usuarioTipo, setUsuarioTipo] = useState("");
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [solicitacoesFiltradas, setSolicitacoesFiltradas] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [livNome, setlivNome] = useState('');

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = async () => {
    if (selectedUsers.size === 0) {
      alert("Nenhum usuário selecionado. Por favor, selecione um usuário antes de confirmar.");
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
      router.push('../usuarios/usu_pendentes');
    } catch (error) {
      alert("Erro ao atualizar usuários.");
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
    async function handleListaUsuarios() {
      try {
        const response = await api.post('/usu_pendentes');
        setListaUsuarios(response.data.dados);
        setSolicitacoesFiltradas(response.data.dados);
      } catch (error) {
        alert('Erro ao buscar usuários pendentes.');
      }
    }
    handleListaUsuarios();
  }, []);

  const filtrarSolicitacoes = (situacao) => {
    const filtradas = listaUsuarios.filter((solicit) => solicit.situacao === situacao);
    setSolicitacoesFiltradas(filtradas);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.selecao}>Solicitações de usuários</h1>
      <BarraPesquisa livNome={livNome} atLivNome={setlivNome} />

      {/* Radio Buttons para selecionar o critério de pesquisa */}
      <div>
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
          <option value="5">Negar acesso</option>
        </select>
        <button onClick={openModalConfirm}>Confirmar</button>
      </div>

      {/* Exibe as solicitações filtradas */}
      <div>
        {solicitacoesFiltradas.map((solicit) => (
          <div key={solicit.usu_cod}>
            <p>Nome: {solicit.usu_nome}</p>
            <p>RM: {solicit.usu_rm}</p>
            <p>E-mail: {solicit.usu_email}</p>
            <p>Curso técnico ou médio: {solicit.cur_nome}</p>
            <input
              type="checkbox"
              checked={selectedUsers.has(solicit.usu_cod)}
              onChange={() => toggleUserSelection(solicit.usu_cod)}
            />
          </div>
        ))}
      </div>
      <ModalConfirmar
        show={showModalConfirm}
        onClose={closeModalConfirm}
        onConfirm={handleConfirm}
      />
    </main>
  );
}
