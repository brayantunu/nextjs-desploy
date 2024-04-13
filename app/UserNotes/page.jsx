"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import SpinnerCentered from '@/components/SpinnerCenter';
import { useAuth } from '../AuthContext'; // Importa el hook useAuth

const NotesComponent = () => {
  const { authToken } = useAuth(); // Obtén el token de acceso del contexto useAuth
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Utiliza el token de acceso obtenido del contexto useAuth en lugar de leerlo directamente desde el almacenamiento local
        const response = await axios.get('http://localhost:4002/notes/all', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, [authToken]); // Agrega authToken como dependencia para que se vuelva a cargar cuando cambie

  return (
    <div>
      {loading ? (
        <SpinnerCentered />
      ) : (
        <div>
          <h1 className='text-center'>Notas del usuario</h1>
          <ul>
            {notes.map((note, index) => (
              <li key={index}>
                <strong>Título:</strong> {note.title}<br />
                <strong>Descripción:</strong> {note.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotesComponent;
