"use client";
// Notes.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SpinnerCentered from "@/components/SpinnerCenter";
import { useAuth } from "../api/users/route";
import NoteCard from "../../components/cardNote";
import Modalcreate from "@/components/modalcreate";
import ModalEdit from "@/components/modaledit";
const Notes = () => {
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (!authToken) {
          throw new Error("Unauthorized");
        }

        const response = await axios.get("http://localhost:4002/notes/all", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
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
      await axios.delete(`http://localhost:4002/notes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // Filtra las notas para eliminar la nota con el ID correspondiente
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = (id) => {
    // Encuentra la nota seleccionada por su ID
    const selectedNote = notes.find((note) => note._id === id);
    // Abre el modal para editar la nota y pasa los datos de la nota al modal
    setIsEditModalOpen(true);
    setSelectedNote(selectedNote);
  };

  return (
    <div>
      {loading ? (
        <SpinnerCentered />
      ) : (
        <div>
          <h1 className="text-center text-lochmara-600 mb-4">Calendario</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 mb-4">
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                id={note._id}
                title={note.title || ""} // Aseguramos que el título no sea null
                description={note.description || ""} // Aseguramos que la descripción no sea null
                imageSrc={note.imageSrc || ""} // Aseguramos que la imagen no sea null
                onDelete={deleteNote}
                onEdit={editNote} // Agrega la función editNote como prop
                setIsModalOpen={setIsModalOpen} // Pasa setIsModalOpen como prop
                setSelectedNote={setSelectedNote} // Pasa setSelectedNote como prop
              />
            ))}
          </div>
          <div className="buttonall-container">
            <ModalEdit
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              selectedNote={selectedNote}
            />
            <Modalcreate
              isModalOpen={isModalOpen} // Pasa isModalOpen como prop
              setIsModalOpen={setIsModalOpen} // Pasa setIsModalOpen como prop
              selectedNote={selectedNote} // Pasa selectedNote como prop
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
