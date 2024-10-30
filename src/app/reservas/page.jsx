"use client";
import { useState, useEffect } from "react";
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
    { value: 'Empréstimo', label: 'Data da reserva' },
];

export default function Reservas() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
    }

    const [reserva, setReserva] = useState([]);
    const [selectedSearchOption, setSelectedSearchOption] = useState('liv_nome');
    const [mensagemStatus, setMensagemStatus] = useState('');

    const [livNome, setlivNome] = useState('')

    function atLivNome(nome) {
        setlivNome(nome)
    }

    useEffect(() => {
        listaLivros();
    }, []);

    async function listaLivros() {
        const dados = {
            usu_cod: codUsu,
            [selectedSearchOption]: livNome
        };
        try {
            const response = await api.post('/reservas', dados);
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
        setMensagemStatus('Livro retirado!'); // Atualizado: Definir mensagem de confirmação
        setShowModalConfirm(false);
    };

    const handleCancel = () => {
        setMensagemStatus('Retirada cancelada.'); // Atualizado: Definir mensagem de cancelamento
        setShowModalConfirm(false);
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
                    {reserva.length > 0 ? (
                        reserva.map((reserv) => (
                            <div key={reserv.usu_cod} className={styles.lineSquare}>
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
                                    <p className={styles.info}>Data do Empréstimo: {reserv.emp_data_emp || 'Data não disponível'}</p>

                                    <p className={styles.info}>Início da Reserva: {reserv.periodo.inicio || 'Data não disponível'}</p>
                                    <p className={styles.info}>Fim da Reserva: {reserv.periodo.fim || 'Data não disponível'}</p>

                                    <p className={styles.info}>Data de Devolução: {reserv.emp_data_devol || 'Data não disponível'}</p>
                                    <div className={styles.line}></div>
                                    <p className={styles.pUsuario}>Confirmar retirada do livro</p>
                                    {mensagemStatus ? ( // Exibe a mensagem fixa se existir
                                        <p className={styles.statusMessage}>{mensagemStatus}</p>
                                    ) : (
                                        <div className={styles.opcao}>
                                            <button
                                                type="button"
                                                onClick={() => { openModalConfirm(); setMensagemStatus('Livro retirado!'); }}
                                                className={styles.confirmButton}>
                                                Retirada confirmada
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { openModalConfirm(); setMensagemStatus('Retirada cancelada.'); }}
                                                className={styles.cancelButton}>
                                                Cancelar retirada
                                            </button>
                                        </div>
                                    )}
                                    <p className={styles.obs}>
                                        OBS: Lembre-se de devolver o livro até a data!
                                    </p>
                                    {mensagemRetirada && <p className={styles.mensagemRetirada}>{mensagemRetirada}</p>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>Não há resultados para a requisição</h1>
                    )}
                </div>
            </div>
            <ModalConfirmar
                show={showModalConfirm}
                onClose={closeModalConfirm}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </main>
    );
}
