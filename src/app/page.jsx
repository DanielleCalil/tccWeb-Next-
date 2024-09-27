"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import api from '@/services/api';

import BarraPesquisa from "@/componentes/barraPesquisa/page";
import Recomendacoes from "@/componentes/recomendacoes/page";

const searchOptions = [
  { value: 'liv_nome', label: 'Livro' },
  { value: 'aut_nome', label: 'Autor' },
  { value: 'edt_nome', label: 'Editora' },
  { value: 'gen_nome', label: 'Gênero' },
  { value: 'liv_cod', label: 'Código' },
  { value: 'curso', label: 'Curso' },
];

export default function Home() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

  const imageLoader = ({ src, width, quality }) => {
    return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
  }

  const [books, setBooks] = useState([]);
  const [selectedSearchOption, setSelectedSearchOption] = useState('liv_nome');
  const [livNome, setlivNome] = useState('')

  function atLivNome(nome) {
    setlivNome(nome) //Atualiza o estado livNome com o nome do livro que está sendo pesquisado.
  }

  useEffect(() => {
    listaLivros();
  }, []);

  async function listaLivros() {
    const dados = {
      [selectedSearchOption]: livNome, // Dinamicamente envia o campo baseado no radio button
      liv_nome: livNome
    };

    try {
      const response = await api.post('/rec_listar', dados);
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
  // console.log(livNome)

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <BarraPesquisa livNome={livNome} atLivNome={atLivNome} listaLivros={listaLivros} />

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

        <div className={styles.img}>
          <Image
            src="/imagens_telas/horario.png"
            width={1709}
            height={379}
            className={styles.imgHorario}
            alt="Imagem Horário de Funcionamento"
            priority={true}
          />
        </div>

        <Recomendacoes />

        <div className={styles.img}>
          <Image
            src="/imagens_telas/frase.png"
            className={styles.imgFrase}
            width={1709}
            height={379}
            alt="Imagem Frase"
            priority={false}
          />
        </div>
      </div>
    </main>
  );
}
