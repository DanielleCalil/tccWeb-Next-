import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { format, addDays, eachDayOfInterval, startOfToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './page.module.css';
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Calendario = ({recebeData}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(startOfToday()); // Estado para data atual do calendário
  const calendarRef = useRef(null); // Cria uma referência para o calendário
  const [reservaPeriodo, setReservaPeriodo] = useState('');

  const today = startOfToday(); // Obtém a data de hoje

  const handleDateClick = (info) => {
    if (info.date < today) {
      // Impede a seleção de datas anteriores à data atual
      alert('Você não pode selecionar uma data anterior ao hoje.');
      return;
    }

    const selectedDate = new Date(info.date);
    const finalDate = addDays(selectedDate, 15);

    const formattedStartDate = format(selectedDate, 'dd-MM-yyyy');
    const formattedEndDate = format(finalDate, 'dd-MM-yyyy');

    // Atualiza as datas de início e fim
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    // **Atualiza reservaPeriodo com o intervalo selecionado**
    setReservaPeriodo(`Período de Reserva: ${formattedStartDate} até ${formattedEndDate}`);

    // Cria os eventos do calendário
    const daysBetween = eachDayOfInterval({
      start: selectedDate,
      end: finalDate,
    });

    setEvents([
      {
        start: format(selectedDate, 'yyyy-MM-dd'),
        end: format(selectedDate, 'yyyy-MM-dd'),
        // title: 'Data de Empréstimo',
        color: '#FF735C', // Cor vibrante para a data inicial
        display: 'background',
      },
      {
        start: format(finalDate, 'yyyy-MM-dd'),
        end: format(finalDate, 'yyyy-MM-dd'),
        // title: 'Data de Devolução Prevista',
        color: '#FF735C', // Cor vibrante para a data final
        display: 'background',
      },
      ...daysBetween.map((day) => ({
        start: format(day, 'yyyy-MM-dd'),
        end: format(day, 'yyyy-MM-dd'),
        // title: 'Período de Reserva',
        backgroundColor: '#FF735C',
        display: 'background',
      })),
    ]);

    // setTimeout(() => onDataSelecionada(selectedDate), 0); 
    recebeData(format(selectedDate, 'yyyy-MM-dd'));
  };

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev(); // Vai para o mês anterior
    // setCurrentDate(calendarApi.getDate()); // Envia data selecionada para a página de pesquisa de disponibilidade
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next(); // Vai para o próximo mês
    setCurrentDate(calendarApi.getDate()); // Atualiza a data atual do calendário
  };

  return (
    <main className={styles.main}>
      <div className="containerGlobal">
        <div className={styles.calendarContainer}>
          {/* Controles de navegação e título do mês */}
          <div className={styles.navigationButtons}>

            <IoCaretBack onClick={handlePrev} className={styles.navButton} /> {/* Botão para o mês anterior */}

            <span className={styles.monthTitle}>
              {capitalizeFirstLetter(format(currentDate, 'MMMM yyyy', { locale: ptBR }))} {/* Título do mês */}
            </span>

            <IoCaretForward onClick={handleNext} className={styles.navButton} /> {/* Botão para o próximo mês */}

          </div>

          {/* Calendário */}
          <div className={styles.calendarWrapper}
            style={{
              '--fc-today-bg-color': '#3F7263', // Cor de fundo do dia atual
            }}
          >
            <FullCalendar
              ref={calendarRef} // Conecta o calendário à referência
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={handleDateClick}
              locale={ptBrLocale}
              events={events}
              headerToolbar={false} // Remove a toolbar de cabeçalho padrão
              validRange={{ start: today }}
              height="auto" // Ajuste de altura
              contentHeight="auto" // Ajuste de altura do conteúdo
              eventContent={(eventInfo) => (
                <div className={styles.eventContent}>
                  <span>{eventInfo.event.title}</span>
                </div>
              )}
            />
          </div>

          {/* Exibição das datas selecionadas */}
          <div className={styles.dateInfo}>
            <label>
              Data Inicial:
              <input type="text" value={startDate} readOnly className={styles.dateInput} />
            </label>
            <label>
              Data Final:
              <input type="text" value={endDate} readOnly className={styles.dateInput} />
            </label>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calendario;
