// components/Calendario.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { format, addDays, eachDayOfInterval, startOfToday } from 'date-fns';
import styles from './page.module.css';

const Calendario = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState([]);

  const today = startOfToday(); // Obtém a data de hoje

  const handleDateClick = (info) => {
    if (info.date < today) {
      // Impede a seleção de datas anteriores à data atual
      alert('Você não pode selecionar uma data anterior ao hoje.');
      return;
    }

    const selectedDate = new Date(info.date);
    const finalDate = addDays(selectedDate, 15);

    const formattedStartDate = format(selectedDate, 'yyyy-MM-dd');
    const formattedEndDate = format(finalDate, 'yyyy-MM-dd');

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    const daysBetween = eachDayOfInterval({
      start: selectedDate,
      end: finalDate,
    });

    setEvents([
      {
        title: 'Data Inicial',
        start: formattedStartDate,
        end: formattedStartDate,
        color: '#FF4081', // Cor vibrante para a data inicial
        display: 'background',
        borderColor: '#FF4081',
        rendering: 'background',
      },
      {
        title: 'Data Final',
        start: formattedEndDate,
        end: formattedEndDate,
        color: '#7C4DFF', // Cor vibrante para a data final
        display: 'background',
        borderColor: '#7C4DFF',
        rendering: 'background',
      },
      ...daysBetween.map(day => ({
        title: 'Período',
        start: format(day, 'yyyy-MM-dd'),
        end: format(day, 'yyyy-MM-dd'),
        color: 'rgba(255, 193, 7, 0.6)', // Cor amarela vibrante e opaca
        display: 'background',
        borderColor: 'rgba(255, 193, 7, 0.8)', // Borda amarela vibrante
        rendering: 'background',
      }))
    ]);
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        locale={ptBrLocale}
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        validRange={{ start: today }}
        eventContent={(eventInfo) => (
          <div className={styles.eventContent}>
            <span>{eventInfo.event.title}</span>
          </div>
        )}
      />

      <div className={styles.dateInfo}>
        <label>
          Data Inicial:
          <input type="text" value={startDate} readOnly className={styles.dateInput} />
        </label>
        <br />
        <label>
          Data Final:
          <input type="text" value={endDate} readOnly className={styles.dateInput} />
        </label>
      </div>
    </div>
  );
};

export default Calendario;
