"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import ModalConfirmar from '@/componentes/modalConfirmar/page';

// const infoContat = [
//   {
//     esc_nome: "ETEC PROF. MASSUYUKI KAWANO",
//     infos: "(14) 3496 1520 - (14) 3491 5393\nRUA: BEZERRA DE MENEZES, 215\nCEP 17605-440\nE136DIR@CPS.SP.GOV.BR",
//   },
// ];

export default function InfoContatoEditar({ codInfo }) {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const router = useRouter();

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => setShowModalConfirm(false);

  const handleConfirm = async () => {
    closeModalConfirm();
    await handleSave();
  };

  const [isSaving, setIsSaving] = useState(null);

  const [infoContatoEdt, setInfoContatoEdt] = useState({
    "esc_nome": '',
    "esc_endereco": '',
    "esc_tel": '',
    "esc_cel": '',
    "esc_email": '',
    "cont_cod": '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const informacoes = async () => {
      const dados = { cont_cod: codInfo };

      try {
        const response = await api.post('/contatos', dados);
        if (response.data.sucesso) {
          const infoApi = response.data.dados[0];
          setInfoContatoEdt(infoApi);
        } else {
          setError(response.data.mensagem)
        }
      } catch (error) {
        setError(error.response ? error.response.data.mensagem : 'Erro no front-end');
      }
    };

    informacoes();
  }, []);

  const handleSave = async () => {
    const { esc_nome, esc_endereco, esc_tel, esc_cel, esc_email } = infoContatoEdt;

    if (!esc_nome || !esc_endereco || !esc_tel || !esc_cel || !esc_email) {
      alert('Todos os campos devem ser preenchidos');
      return;
    }

    setIsSaving(true); // Inicia o salvamento

    try {
      const response = await api.patch(`/contatos/${infoContatoEdt.cont_cod}`, {
        ...infoContatoEdt,
      });

      if (response.data.sucesso) {
        alert('Informações de contato atualizado com sucesso!');
        router.push('/infoContato'); // Redireciona após o sucesso
      }
    } catch (error) {
      console.error("Erro ao salvar informações de contato:", error);
      alert(error.response ? error.response.data.mensagem : 'Erro ao salvar informações. Tente novamente.');
    } finally {
      setIsSaving(false); // Finaliza o salvamento
    }
  };
  console.log(infoContatoEdt);

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.contato}>Informações de Contato</h1>
        {infoContatoEdt ? (
            <div className={styles.container}>
              <Image
                src="/imagens_telas/contato.jpg"
                alt="Imagem tela contatos"
                className={styles.imgContato}
                width={3000}
                height={2000}
              />
              <form>
                <div className={styles.inputContainer}>
                  <div className={styles.inputGroup}>
                    <div className={styles.space}>
                      <span className={styles.titleSuperior}>Nome da escola:</span>
                      <input
                        type="text"
                        value={infoContatoEdt.esc_nome}
                        onChange={(e) => setInfoContatoEdt({ ...infoContatoEdt, esc_nome: e.target.value })}
                        className={`${styles.inputField} ${styles.nomeInput}`}
                        aria-label="Nome da escola"
                      />
                    </div>
                    <div className={styles.space}>
                      <span className={styles.titleSuperior}>Endereço da escola:</span>
                      <input
                        type="text"
                        value={infoContatoEdt.esc_endereco}
                        onChange={(e) => setInfoContatoEdt({ ...infoContatoEdt, esc_endereco: e.target.value })}
                        className={`${styles.inputField} ${styles.nomeInput}`}
                        aria-label="Endereço da escola"
                      />
                    </div>
                    <div className={styles.space}>
                      <span className={styles.titleSuperior}>Telefone da escola:</span>
                      <input
                        type="text"
                        value={infoContatoEdt.esc_tel}
                        onChange={(e) => setInfoContatoEdt({ ...infoContatoEdt, esc_tel: e.target.value })}
                        className={`${styles.inputField} ${styles.nomeInput}`}
                        aria-label="Telefone da escola"
                      />
                    </div>
                    <div className={styles.space}>
                      <span className={styles.titleSuperior}>Celular da escola:</span>
                      <input
                        type="text"
                        value={infoContatoEdt.esc_cel}
                        onChange={(e) => setInfoContatoEdt({ ...infoContatoEdt, esc_cel: e.target.value })}
                        className={`${styles.inputField} ${styles.nomeInput}`}
                        aria-label="Celular da escola"
                      />
                    </div>
                    <div className={styles.space}>
                      <span className={styles.titleSuperior}>E-mail da escola:</span>
                      <input
                        type="text"
                        value={infoContatoEdt.esc_email}
                        onChange={(e) => setInfoContatoEdt({ ...infoContatoEdt, esc_email: e.target.value })}
                        className={`${styles.inputField} ${styles.nomeInput}`}
                        aria-label="E-mail da escola"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
         ) : (
          <h1>Não há resultados para a requisição</h1>
      )}

        <div className={styles.editar}>
          <button
            type="submit"
            onClick={openModalConfirm}
            className={styles.saveButton}
          >
            {isSaving ? 'Salvando...' : 'Salvar alterações'}
          </button>
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