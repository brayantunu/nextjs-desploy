import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { createNote, getNotes } from '../../app/api/users/ApiNotes'; // Importa tus funciones aquí
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/Calendar.css';

const localizer = momentLocalizer(moment);

function Calendario() {
  const [events, setEvents] = useState([]);
  const authToken = 'your-auth-token'; // Reemplaza con tu token de autenticación

  useEffect(() => {
    getNotes(authToken)
      .then(response => {
        const events = response.map(note => ({
          id: note._id,
          title: note.description,
          start: new Date(note.createdAt), // Ajusta estos campos según tu estructura de datos
          end: new Date(note.createdAt)    // Ajusta estos campos según tu estructura de datos
        }));
        setEvents(events);
      })
      .catch(error => console.error('Error fetching notes:', error));
  }, [authToken]);

  const handleSelectSlot = ({ start, end }) => {
    const description = prompt('Event Description:');
    if (description) {
      createNote(authToken, description)
        .then(response => {
          const newEvent = {
            id: response._id,
            title: response.description,
            start: new Date(response.createdAt),
            end: new Date(response.createdAt)
          };
          setEvents([...events, newEvent]);
        })
        .catch(error => console.error('Error creating note:', error));
    }
  };

  const handleSelectEvent = (event) => {
    const newDescription = prompt('New Event Description:', event.title);
    if (newDescription) {
      axios.put(`http://localhost:4002/notes/${event.id}`, { description: newDescription }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        const updatedEvents = events.map(ev => (ev.id === event.id ? {
          ...ev,
          title: response.data.description
        } : ev));
        setEvents(updatedEvents);
      })
      .catch(error => console.error('Error updating note:', error));
    }
  };

  return (
    <div className="calendario">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}

export default Calendario;
