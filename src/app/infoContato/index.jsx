import Image from "next/image";
import styles from "./index.module.css";
import Link from 'next/link';

export default function InfoContato() {
  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <h1 className={styles.contato}>Informações de Contato</h1>

        <div className={styles.container}>
          <Image
            src="/imagens_telas/contato.jpg"
            alt="Imagem tela contatos"
            className={styles.imgContato}
          />
          <p className={styles.escola}>ETEC PROF. MASSUYUKI KAWANO</p>
          <p className={styles.infos}>
            (14) 3496 1520 - (14) 3491 5393 <br />
            RUA: BEZERRA DE MENEZES, 215 <br />
            CEP 17605-440 <br />
            E136DIR@CPS.SP.GOV.BR
          </p>
        </div>

        <div className={styles.editar}>
          <Link href="/infoContatoEditar/">
            <button
              type="button"
              className={styles.editarButton}
            >
              <Image
                src="/imagens_telas/editar_perfil.png"
                alt="Imagem de Perfil Padrão"
              />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
