'use client'
import  { useState, useEffect } from 'react';
import Note from '@/components/note';
import SpinnerCentered from '@/components/SpinnerCenter';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/notes/all')
      .then(response => response.json())
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  return (
    <div>
      <div className='my-5 text-center'>
        <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 text-2xl">
          Tus<br />
          Notas
        </span>
      </div>
      {loading ? (
        <SpinnerCentered/>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {notes.map((note, index) => (
            <Note key={index} _id={note._id} title={note.title} descripcion={note.descripcion} />
          ))}
        </div>
      )}
    </div>
  );
}
