"use client"
import { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import ModalConfirmar from '@/componentes/modalConfirmar/page';

const infoContat = [
  {
    esc_nome: "ETEC PROF. MASSUYUKI KAWANO",
    infos: "(14) 3496 1520 - (14) 3491 5393\nRUA: BEZERRA DE MENEZES, 215\nCEP 17605-440\nE136DIR@CPS.SP.GOV.BR",
  },
];

export default function InfoContatoEditar() {

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const openModalConfirm = () => setShowModalConfirm(true);
  const closeModalConfirm = () => {
    setShowModalConfirm(false);
    onClose();
  };

  const [text, setText] = useState(informacoes.infos);

    const handleChange = (event) => {
        setText(event.target.value);
    };

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.contato}>Informações de Contato</h1>

        <div className={styles.container}>
          <Image
            src="/imagens_telas/contato.jpg"
            alt="Imagem tela contatos"
            className={styles.imgContato}
            width={3000}
            height={2000}
          />
          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <form>
                <input
                  type="text"
                  id="nome"
                  placeholder="Nome da escola"
                  name="nome"
                  defaultValue="ETEC PROF. MASSUYUKI KAWANO"
                  className={`${styles.inputField} ${styles.nomeInput}`}
                />
                <br /><br />
                <div className={styles.textareaWrapper}>
                  <textarea
                    value={text}
                    onChange={handleChange}
                    name="infos"
                    className={`${styles.inputField} ${styles.nomeInput}`}
                    rows="10"
                  >
                    (14) 3496 1520 - (14) 3491 5393
                    RUA: BEZERRA DE MENEZES, 215
                    CEP 17605-440
                    E136DIR@CPS.SP.GOV.BR
                  </textarea>
                </div>
              </form>
            </div>
          </div>
       
        <div className={styles.editar}>
          <button
            type="submit"
            onClick={openModalConfirm}
            className={styles.saveButton}
          >
            Salvar
          </button>
        </div>
      </div>
      <ModalConfirmar show={showModalConfirm} onClose={closeModalConfirm} />
    </main>
  );
}
