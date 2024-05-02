"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flash from '@/components/Flash';
import { Card, CardHeader, CardBody, Divider, Button } from '@nextui-org/react';
import { useAuth } from '../api/users/route'; // Asegúrate de proporcionar la ruta correcta hacia useAuth

export default function EditNote() {
  const { authToken } = useAuth(); // Obtén el token de autenticación del hook useAuth
  const [noteData, setNoteData] = useState({ title: '', description: '' });
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    // Analiza los datos de la nota de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const noteString = searchParams.get('note');
    const note = JSON.parse(decodeURIComponent(noteString));
    setNoteData(note);
  }, []);

  const handleNoteSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`https://backend-web-notes.onrender.com/notes/edit/${noteData._id}`, noteData, {
        headers: {
          Authorization: `Bearer ${authToken}` // Utiliza el token de autenticación
        }
      });
      setFlashMessage(response.data.message); // Mensaje de éxito recibido del backend
      // Puedes agregar lógica adicional aquí, como redirigir al usuario a otra página
      window.location.href = "/UserNotes";
    } catch (error) {
      console.error("Error al editar la nota:", error);
      // Puedes agregar aquí la lógica para mostrar un mensaje de error si lo deseas
    }
  };

  return (
    <main className="h-full fixed w-full">
      {flashMessage && <Flash message={flashMessage} />}
      <Card className="max-w-[400px] mx-auto my-96">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Edit Notes</p>
            <p className="text-small text-default-500">Modifique tu Nota</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={handleNoteSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                className="form-control w-full mb-6"
                placeholder="title"
                value={noteData.title}
                onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                placeholder="description"
                className="form-control w-full h-20"
                value={noteData.description}
                onChange={(e) => setNoteData({ ...noteData, description: e.target.value })}
              ></textarea>
            </div>
            <div className="form-group grid place-items-center w-full">
              <Button color="primary" type="submit">
                Save
              </Button>
            </div>
          </form>
        </CardBody>
        <Divider />
      </Card>
    </main>
  );
}
