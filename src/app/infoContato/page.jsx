"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import api from '@/services/api';

export default function InfoContato() {
  const [infoContato, setInfoContato] = useState([]);

  useEffect(() => {
    informacoes();
  }, []);

  async function informacoes() {
    const dados = { cont_cod: 1 };
    try {
      const response = await api.post('/contatos', dados);
      console.log(response.data.dados);
      setInfoContato(response.data.dados);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem + '\n' + error.response.data.dados);
      } else {
        alert('Erro no front-end' + '\n' + error);
      }
    }
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
        </div>

        {infoContato.length > 0 ? (
          infoContato.map(infoCont => (
            <div key={infoCont.cont_cod} className={styles.informacoes}>
              <p className={styles.escola}>{infoCont.esc_nome}</p>
              <p className={styles.infos}>{infoCont.esc_endereco}</p>
              <p className={styles.infos}>{infoCont.esc_tel}</p>
              <p className={styles.infos}>{infoCont.esc_cel}</p>
              <p className={styles.infos}>{infoCont.esc_email}</p>

              <div className={styles.editar}>
                <Link href={`/infoContato/${infoCont.cont_cod}`}>
                  <button className={styles.editarButton}>
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
          ))
        ) : (
          <h1>Não há resultados para a requisição</h1>
        )}
      </div>
    </main>
  );
}
