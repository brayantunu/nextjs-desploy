"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flash from '@/components/Flash';
import { Card, CardHeader, CardBody, Divider, Button } from '@nextui-org/react';

export default function EditNote() {
  const [noteData, setNoteData] = useState({ title: '', descripcion: '' });
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
      await axios.put(`http://localhost:4002/notes/edit/${noteData._id}`, noteData);
      setFlashMessage('¡Nota editada exitosamente!');
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/';
      }, 2000); // Redirige después de 2 segundos
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
                name="descripcion"
                placeholder="descripcion"
                className="form-control w-full h-20"
                value={noteData.descripcion}
                onChange={(e) => setNoteData({ ...noteData, descripcion: e.target.value })}
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
