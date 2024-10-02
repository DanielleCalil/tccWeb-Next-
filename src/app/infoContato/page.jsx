"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

const infoContat = [
  {
    esc_nome: "ETEC PROF. MASSUYUKI KAWANO",
    infos: "(14) 3496 1520 - (14) 3491 5393\nRUA: BEZERRA DE MENEZES, 215\nCEP 17605-440\nE136DIR@CPS.SP.GOV.BR",
  },
];

export default function InfoContato() {

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
        </div>
        {infoContat.length > 0 ? (
          infoContat.map((informacoes, index) => (
            <div key={index} className={styles.informacoes}>
              <p className={styles.escola}>{informacoes.esc_nome}</p>
              {/* Divide o texto de `infos` por quebras de linha */}
              {informacoes.infos.split('\n').map((line, i) => (
                <p key={i} className={styles.infos}>{line}</p>
              ))}
              <div className={styles.editar}>
                <Link href="/infoContatoEditar/">
                  <button
                    type="submit"
                    className={styles.editarButton}
                  >
                    <Image
                      src="/imagens_telas/editar_perfil.png"
                      alt="Imagem de Perfil Padrão"
                      width={500}
                      height={500}
                    />
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h1>Nenhuma informação de contato encontrada.</h1>
        )}
      </div>
    </main>
  );
}
