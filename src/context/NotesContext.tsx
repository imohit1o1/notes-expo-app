import React, { createContext, useContext, useState, useMemo } from 'react';
import { NoteItem } from '../types';
import { INITIAL_NOTES } from '../constants';

interface NotesContextType {
  notes: NoteItem[];
  addNote: (title: string, text: string) => void;
  updateNote: (id: string, title: string, text: string) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);

  const addNote = (title: string, text: string) => {
    if (!title.trim() && !text.trim()) return;
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title,
      text,
      createdAt: new Date().toISOString(),
      isPinned: false,
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id: string, title: string, text: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, title, text } : n))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const togglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, togglePin }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotesContext must be used within a NotesProvider');
  return context;
};
