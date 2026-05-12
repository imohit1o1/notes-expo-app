import { useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { NoteItem } from '../types';
import { INITIAL_NOTES } from '../constants';

export const useNotes = () => {
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);
  const [search, setSearch] = useState('');

  const filteredNotes = useMemo(() => {
    return notes
      .filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.text.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
  }, [search, notes]);

  const togglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleLongPress = (id: string, isPinned: boolean) => {
    Alert.alert('Note Actions', 'Choose an action for this note', [
      {
        text: isPinned ? 'Unpin' : 'Pin',
        onPress: () => togglePin(id),
      },
      {
        text: 'Delete',
        onPress: () => confirmDelete(id),
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const confirmDelete = (id: string) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => deleteNote(id), style: 'destructive' },
    ]);
  };

  return {
    search,
    setSearch,
    filteredNotes,
    handleLongPress,
  };
};
