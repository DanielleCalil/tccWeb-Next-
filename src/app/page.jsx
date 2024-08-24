import Image from "next/image";
import styles from "./page.module.css";

import Searchbar from "@/componentes/searchbar";
import Recomendacoes from "@/componentes/recomendacoes";

export default function Home() {
  return (
    <main className="containerGlobal">
      <Searchbar />

      <div className={styles.img}>
        <Image src="/imagens_telas/horario.png" width={1709} height={379} className={styles.imgHorario} />
      </div>

      <Recomendacoes />

      <div className={styles.img}>
        <Image src="/imagens_telas/frase.png" className={styles.imgFrase} width={439} height={455} />
      </div>

    </main>
  );
}
