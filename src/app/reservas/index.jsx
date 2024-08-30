import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';
import BarraPesquisa from '@/componentes/barraPesquisa';

export default function Reservas() {
    return (
        <main className={styles.main}>
            <div className={styles.containerGlobal}>
                <h1 className={styles.informacoes}>Informações do livro</h1>
                <BarraPesquisa />
                <div className={styles.container}>
                    <div className={styles.lineSquare}>
                        <div className={styles.inputContainer}>
                            <div className={styles.infoBookReserva}>
                                <Image
                                    src="/Capa_dos_livros/o_diario_de_anne_frank.jpg"
                                    alt="O Diário de Anne Frank"
                                    className={styles.imgReserva}
                                    width={200} // Defina o tamanho conforme necessário
                                    height={300} // Defina o tamanho conforme necessário
                                />
                                <div className={styles.livroInfo}>
                                    <p>O Diário de Anne Frank</p>
                                    <p>Por: Anne Frank</p>
                                </div>
                            </div>
                            <div className={styles.line}></div>
                            <p className={styles.info}>Reservado por: Clara Oliveira da Silva</p>
                            <p className={styles.info}>Reserva realizada no dia: 12/03/2024</p>
                            <p className={styles.info}>Período da reserva: 12/03/2024 até 27/03/2024</p>
                            <div className={styles.line}></div>
                            <p className={styles.pUsuario}>Confirmar retirada do livro</p>
                            <div className={styles.opcao}>
                                <button
                                    type="button"
                                    className={styles.confirmButton}>
                                    Retirada confirmada</button>
                                <button
                                    type="button"
                                    className={styles.cancelButton}>
                                    Cancelar retirada</button>
                            </div>
                            <p className={styles.obs}>
                                OBS: se após 3 dias da data inicial da reserva não for declarada nenhuma informação a respeito da retirada,
                                a reserva será automaticamente cancelada.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
