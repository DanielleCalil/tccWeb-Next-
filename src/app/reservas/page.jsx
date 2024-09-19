"use client";
import { useState } from "react";
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BarraPesquisa from '@/componentes/barraPesquisa/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page';

const infoReserva = [
    {
        livro: {
            liv_nome: "O Diário de Anne Frank",
            aut_nome: "Anne Frank",
            liv_foto_capa: "/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg"
        },
        usu_nome: "Clara Oliveira da Silva",
        dataReserva: "12/03/2024",
        periodo: {
            inicio: "12/03/2024",
            fim: "27/03/2024"
        },
    },
];

const searchOptions = [
    { value: 'liv_nome', label: 'Livro' },
    { value: 'aut_nome', label: 'Autor' },
    { value: 'dataReserva', label: 'Data da reserva' },
];

export default function Reservas() {

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const router = useRouter();

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = () => {
        setShowModalConfirm(false); // Fecha o modal
        router.push('/reservas');
    };

    const [selectedSearchOption, setSelectedSearchOption] = useState('liv_nome');

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
    // console.log(livNome)

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Informações do livro reservado</h1>
                <BarraPesquisa />

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

                <div className={styles.container}>
                    {infoReserva.map((reserva, index) => (
                        <div key={index} className={styles.lineSquare}>
                            <div className={styles.inputContainer}>
                                <div className={styles.infoBookReserva}>
                                    <Image
                                        src={reserva.livro.liv_foto_capa}
                                        alt={reserva.livro.liv_nome}
                                        className={styles.imgReserva}
                                        width={200}
                                        height={300}
                                    />
                                    <div className={styles.livroInfo}>
                                        <p>{reserva.livro.liv_nome}</p>
                                        <p>Por: {reserva.livro.aut_nome}</p>
                                    </div>
                                </div>
                                <div className={styles.line}></div>
                                <p className={styles.info}>Reservado por: {reserva.usu_nome}</p>
                                <p className={styles.info}>Reserva realizada no dia: {reserva.dataReserva}</p>
                                <p className={styles.info}>Período da reserva: {reserva.periodo?.inicio} até {reserva.periodo?.fim || 'Data não disponível'}</p>
                                <div className={styles.line}></div>
                                <p className={styles.pUsuario}>Confirmar retirada do livro</p>
                                <div className={styles.opcao}>
                                    <button
                                        type="button"
                                        onClick={openModalConfirm}
                                        className={styles.confirmButton}>
                                        Retirada confirmada
                                    </button>
                                    <button
                                        type="button"
                                        onClick={openModalConfirm}
                                        className={styles.cancelButton}>
                                        Cancelar retirada
                                    </button>
                                </div>
                                <p className={styles.obs}>
                                    OBS: se após 3 dias da data inicial da reserva não for declarada nenhuma informação a respeito da retirada,
                                    a reserva será automaticamente cancelada.
                                </p>
                            </div>
                        </div>
                    ))}
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
