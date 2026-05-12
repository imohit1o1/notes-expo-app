import { useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNotesContext } from '../context/NotesContext';

export const useNotes = () => {
  const { notes, togglePin, deleteNote } = useNotesContext();
  const [search, setSearch] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, notes]);

  const pinnedNotes = useMemo(() => filteredNotes.filter((n) => n.isPinned), [filteredNotes]);
  const otherNotes = useMemo(() => filteredNotes.filter((n) => !n.isPinned), [filteredNotes]);

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
    pinnedNotes,
    otherNotes,
    handleLongPress,
  };
};
