'use client'
import React, { useState } from 'react';
import { useAuth } from '../app/api/users/route';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importa useHistory para redireccionar

const CreateNoteForm = () => {
  const { authToken } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter(); // Instancia useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createNote();
      console.log(response.data);
      router.push('/UserNotes'); // Redirecciona a la página de notas después de crear la nota
    } catch (error) {
      console.error('Error al crear la nota:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const createNote = async () => {
    return axios.post(
      'http://localhost:4002/notes/new-note',
      { title, description },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
  };

  return (
    <div>
      <h2>Crear Nota</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Crear Nota</button>
      </form>
    </div>
  );
};

export default CreateNoteForm;
