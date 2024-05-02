"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpinnerCentered from '@/components/SpinnerCenter';
import { useAuth } from '../api/users/route';
import NoteCard from '../../components/cardNote';
import Buttonall from '@/components/buttonsall';

const Notes = () => {
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (!authToken) {
          throw new Error('Unauthorized');
        }
        
        const response = await axios.get('https://backend-web-notes.onrender.com/notes/all', {
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
      setLoading(false);
    }
  }, [authToken]);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://backend-web-notes.onrender.com/notes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      // Filtra las notas para eliminar la nota con el ID correspondiente
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const editNote = (id) => {
    // Encuentra la nota seleccionada por su ID
    const selectedNote = notes.find(note => note._id === id);
    // Codifica los datos de la nota en formato de cadena y lo agrega a la URL como parámetro
    const encodedNoteData = encodeURIComponent(JSON.stringify(selectedNote));
    window.location.href = `http://localhost:3000/editnote?note=${encodedNoteData}`;
  };

  const handleNoteSelect = (id) => {
    // Alternar la selección de la nota
    setSelectedNotes(prevSelectedNotes => {
      if (prevSelectedNotes.includes(id)) {
        return prevSelectedNotes.filter(noteId => noteId !== id);
      } else {
        return [...prevSelectedNotes, id];
      }
    });
  };

  const deleteSelectedNotes = async (selectedNotes) => {
    try {
      // Elimina todas las notas seleccionadas
      await Promise.all(selectedNotes.map(deleteNote));
      // Limpia el estado de las notas seleccionadas
      setSelectedNotes([]);
    } catch (error) {
      console.error('Error deleting selected notes:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <SpinnerCentered />
      ) : (
        <div>
          <h1 className='text-center'>Notas del usuario</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4">
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                id={note._id}
                title={note.title}
                description={note.description}
                imageSrc={note.imageSrc}
                onDelete={deleteNote}
                onEdit={editNote} // Agrega la función editNote como prop
                onSelect={handleNoteSelect} // Agrega la función handleNoteSelect como prop
                selected={selectedNotes.includes(note._id)} // Agrega el estado de selección
              />
            ))}
          </div>
          <div className="buttonall-container">
            <Buttonall onDelete={() => deleteSelectedNotes(selectedNotes)} /> {/* Agrega la función onDelete al componente Buttonall */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
