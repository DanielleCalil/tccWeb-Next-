"use client";
import { useState } from "react";
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import BarraPesquisa from '@/componentes/barraPesquisa/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page';

// const infoReserva = [
//     {
//         livro: {
//             liv_nome: "O Diário de Anne Frank",
//             aut_nome: "Anne Frank",
//             liv_foto_capa: "/Capa_dos_livros/O_Diario_de_Anne_Frank.jpg"
//         },
//         usu_nome: "Clara Oliveira da Silva",
//         emp_data_emp: "12/03/2024",
//         periodo: {
//             inicio: "12/03/2024",
//             fim: "27/03/2024"
//         },
//     },
// ];

const searchOptions = [
    { value: 'liv_nome', label: 'Livro' },
    { value: 'aut_nome', label: 'Autor' },
    { value: 'emp_data_emp', label: 'Data da reserva' },
];

export default function Reservas() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
    }

    const [reserva, setReserva] = useState([]);
    const [selectedSearchOption, setSelectedSearchOption] = useState('liv_nome');

    const [livNome, setlivNome] = useState('')

    function atLivNome(nome) {
        setlivNome(nome)
    }

    useEffect(() => {
        listaLivros();
    }, []);

    async function listaLivros() {
        const dados = { [selectedSearchOption]: livNome }; // Dinamicamente envia o campo baseado no radio button
        try {
            const response = await api.post('/emprestimos', dados);
            console.log(response.data.dados);
            setReserva(response.data.dados);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }


    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const router = useRouter();

    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleConfirm = () => {
        setShowModalConfirm(false); // Fecha o modal
        router.push('/reservas');
    };

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Informações do livro reservado</h1>
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

                <div className={styles.container}>
                    {reserva.map(reserv => (
                        <div key={reserv.usu_nome} className={styles.lineSquare}>
                            <div className={styles.inputContainer}>
                                <div className={styles.infoBookReserva}>
                                    <Image
                                        loader={imageLoader}
                                        src={reserv.liv_foto_capa}
                                        alt={reserv.liv_nome}
                                        className={styles.imgReserva}
                                        width={200}
                                        height={300}
                                    />
                                    <div className={styles.livroInfo}>
                                        <p>{reserv.liv_nome}</p>
                                        <p>Por: {reserv.aut_nome}</p>
                                    </div>
                                </div>
                                <div className={styles.line}></div>
                                <p className={styles.info}>Reservado por: {reserv.usu_nome}</p>
                                <p className={styles.info}>Reserva realizada no dia: {reserv.emp_data_emp}</p>
                                <p className={styles.info}>Período da reserva: {reserv.periodo?.inicio} até {reserv.periodo?.fim || 'Data não disponível'}</p>
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
