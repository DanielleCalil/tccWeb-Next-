// components/Calendario.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { format, addDays, eachDayOfInterval, startOfToday } from 'date-fns';

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
        color: 'red', // Cor sólida para a data inicial
        display: 'background',
        borderColor: 'red', // Adiciona uma borda sólida para destacar
        overlap: false,
      },
      {
        title: 'Data Final',
        start: formattedEndDate,
        end: formattedEndDate,
        color: 'blue', // Cor sólida para a data final
        display: 'background',
        borderColor: 'blue', // Adiciona uma borda sólida para destacar
        overlap: false,
      },
      ...daysBetween.map(day => ({
        title: 'Período',
        start: format(day, 'yyyy-MM-dd'),
        end: format(day, 'yyyy-MM-dd'),
        color: 'rgba(0, 255, 0, 0.3)', // Cor verde mais opaca para o período
        display: 'background',
        borderColor: 'rgba(0, 255, 0, 0.3)', // Adiciona uma borda opaca para o período
        overlap: false,
      }))
    ]);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        locale={ptBrLocale}
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth',
        }}
        validRange={{ start: today }} // Define a data mínima que pode ser selecionada
      />

      <div style={{ marginTop: '20px' }}>
        <label>
          Data Inicial:
          <input type="text" value={startDate} readOnly />
        </label>
        <br />
        <label>
          Data Final:
          <input type="text" value={endDate} readOnly />
        </label>
      </div>
    </div>
  );
};

export default Calendario;
