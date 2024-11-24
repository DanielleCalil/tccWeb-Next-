"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import BarraPesquisa from '@/componentes/barraPesquisa/page';
import ModalConfirmar from '@/componentes/modalConfirmar/page';

const searchOptions = [
    { value: 'liv_nome', label: 'Livro' },
    { value: 'aut_nome', label: 'Autor' },
    { value: 'Empréstimo', label: 'Data da reserva' },
];

export default function Reservas() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`;
    };

    const [reserva, setReserva] = useState([]);
    const [selectedSearchOption, setSelectedSearchOption] = useState('liv_nome');
    const [mensagemStatus, setMensagemStatus] = useState('');
    const [livNome, setlivNome] = useState('');

    const router = useRouter();

    function atLivNome(nome) {
        setlivNome(nome);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/usuarios/login');
        } else {
            listaLivros(user.cod);
        }
    }, []);

    async function listaLivros(user) {
        const dados = { usu_cod: user };
        try {
            const response = await api.post('/reservas/:usu_cod', dados);
            setReserva(response.data.dados);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    async function cancelarReserva(emp_cod) {
        try {
            // Atualize a chamada da API para incluir o emp_cod
            const response = await api.patch(`/res_cancelar/${emp_cod}`);
            setMensagemStatus(response.data.mensagem || "Reserva cancelada com sucesso!");
            
            // Recarregar a lista de reservas do servidor
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                listaLivros(user.cod); // Recarrega reservas do usuário
            }
        } catch (error) {
            if (error.response) {
                setMensagemStatus(error.response.data.mensagem || "Erro ao cancelar a reserva.");
            } else {
                setMensagemStatus("Erro ao conectar ao servidor.");
            }
        }
    }
    
    

    return (
        <main className={styles.main}>
            <div className="containerGlobal">
                <h1 className={styles.informacoes}>Informações do livro reservado</h1>
                <BarraPesquisa livNome={livNome} atLivNome={atLivNome} listaLivros={listaLivros} />

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
                                    <p className={styles.info}>Data do Empréstimo: {reserv.Empréstimo || 'Data não disponível'}</p>
                                    <p className={styles.info}>Data de Devolução: {reserv.Devolução || 'Data não disponível'}</p>
                                    <div className={styles.line}></div>
                                    
                                    {/* Botão de cancelar reserva */}
                                    <button
                                        className={styles.cancelButton}
                                        onClick={() => cancelarReserva(reserv.emp_cod)}
                                    >
                                        Cancelar Reserva
                                    </button>
                                    <p className={styles.obs}>
                                        OBS: Lembre-se de devolver o livro até a data!
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>Não há resultados para a requisição</h1>
                    )}
                </div>
                {/* Mensagem de status */}
                {mensagemStatus && <p className={styles.statusMessage}>{mensagemStatus}</p>}
            </div>
        </main>
    );
}
