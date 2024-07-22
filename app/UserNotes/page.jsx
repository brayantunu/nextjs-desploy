"use client";
// Notes.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SpinnerCentered from "@/components/SpinnerCenter";
import { useAuth } from "../api/users/route";
import Calendar from "@/components/calendar/calendar";

const Notes = () => {
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const handleDateChange = (date) => {
    console.log('Selected Date:', date); // Do something with the date here
  };

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
    <div className="flex h-screen"> {/* Add h-screen to the main container */}
      <div className="flex-1 p-4 overflow-y-auto"> {/* Add flex-1 and p-4 to the content container */}
        {loading ? (
          <SpinnerCentered />
        ) : (
          <div className="flex">
            <div className="w-full"> {/* Make the Calendar take up the full width */}
              <Calendar onDateChange={handleDateChange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
