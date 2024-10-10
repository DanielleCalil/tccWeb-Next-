"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import api from '@/services/api';

export default function InfoContato() {
  const [infoContato, setInfoContato] = useState([]);

  useEffect(() => {
    const informacoes = async () => {
      const dados = { cont_cod: 1 };

      try {
        const response = await api.post('/contatos', dados);
        if (response.data.sucesso) {
          const infoApi = response.data.dados[0];
          setInfoContato(infoApi);
        } else {
          setError(response.data.mensagem);
        }
      } catch (error) {
        setError(error.response ? error.response.data.mensagem : 'Erro no front-end');
      }
    };

    informacoes();
  }, []);

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

        {infoContato ? (
          <>
            <div className={styles.informacoes}>
              <p className={styles.escola}>{infoContato.esc_nome}</p>
              <p className={styles.infos}>{infoContato.esc_endereco}</p>
              <p className={styles.infos}>{infoContato.esc_tel}</p>
              {/* <p className={styles.infos}>{infoContato.esc_cel}</p> */}
              <p className={styles.infos}>{infoContato.esc_email}</p>
              <div className={styles.editar}>
                <Link href="/infoContatoEditar/">
                  <button type="button" className={styles.editarButton}>
                    <Image
                      src="/imagens_telas/editar_perfil.png"
                      alt="Ícone de editar perfil"
                      width={500}
                      height={500}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <h1>Não há resultados para a requisição</h1>
        )}
      </div>
    </main>
  );
}
