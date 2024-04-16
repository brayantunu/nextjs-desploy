'use client'
import axios from 'axios';
import { useState, useEffect } from 'react';
import SpinnerCentered from '@/components/SpinnerCenter';
import { useAuth } from '../api/users/route';
import NoteCard from '../../components/cardNote'; // Importa el componente NoteCard

const Notes = () => {
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (!authToken) {
          throw new Error('Unauthorized'); // Si no hay token, lanzar un error de autorización
        }
        
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

    if (authToken) {
      fetchNotes();
    } else {
      setLoading(false); // Si no hay token, detener el estado de carga
    }
  }, [authToken]);

  return (
    <div>
      {loading ? (
        <SpinnerCentered />
      ) : (
        <div>
          <h1 className='text-center'>Notas del usuario</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Mapea las notas y renderiza un NoteCard para cada una */}
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                title={note.title}
                description={note.description}
                imageSrc={note.imageSrc}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
