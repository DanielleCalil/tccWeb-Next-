import Image from "next/image";
import styles from "./page.module.css";

import BarraPesquisa from "@/componentes/barraPesquisa";
import Recomendacoes from "@/componentes/recomendacoes";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <BarraPesquisa />

        <div className={styles.img}>
          <Image src="/imagens_telas/horario.png" width={1709} height={379} className={styles.imgHorario} alt="Horário de Funcionamento" />
        </div>

        <Recomendacoes />

        <div className={styles.img}>
          <Image src="/imagens_telas/frase.png" className={styles.imgFrase} width={1709} height={379} alt="Frase"/>
        </div>
      </div>
    </main>
  );
}
