import { useState, useRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useNotesContext } from '../context/NotesContext';

export const useEditor = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes, addNote, updateNote } = useNotesContext();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const contentInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (id) {
      const existingNote = notes.find((n) => n.id === id);
      if (existingNote) {
        setTitle(existingNote.title);
        setContent(existingNote.text);
      }
    }
  }, [id, notes]);

  const handleSave = () => {
    if (id) {
      updateNote(id, title, content);
    } else {
      addNote(title, content);
    }
    router.back();
  };

  const handleContentPress = () => {
    contentInputRef.current?.focus();
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    contentInputRef,
    handleSave,
    handleContentPress,
  };
};
