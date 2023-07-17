import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { nanoid } from 'nanoid'

function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);


  function getCurrentNote() {
    return notes.find(note => note.id === currentNoteId) || notes[0];
  }

  function addNote() {
    const newNote = {
      id: nanoid,
      title: "Untitled",
      content: "",
      updatedAt: Date.now(),
    };
    setNotes(prevNotes => [...prevNotes, newNote]);

    setCurrentNoteId(newNote.id);
  }

  function deleteNote() {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== currentNoteId));

    if (noteToDeleteId == currentNoteId && notes.length > 0) {
      setCurrentNoteId(notes[0].id);
    }
  }

  function updateNote(updatedNote) {
    setNotes(prevNotes => prevNotes.map(note => {
      if (note.id === updatedNote.id) {
        return updatedNote
      }
      return note
    }));
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
