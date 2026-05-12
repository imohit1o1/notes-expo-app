import React from 'react';
import { StyleSheet, View, FlatList, Text, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './_layout';
import { useNotes } from '../hooks/useNotes';
import { NoteCard } from '../components/NoteCard';
import { SearchBar } from '../components/SearchBar';
import { FloatingButton } from '../components/FloatingButton';

export default function NotesScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { search, setSearch, filteredNotes, handleLongPress } = useNotes();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          title: 'Notes',
          headerRight: () => (
            <Pressable onPress={toggleTheme} style={styles.headerIcon}>
              <Ionicons
                name={isDark ? 'sunny' : 'moon'}
                size={24}
                color={theme.text}
              />
            </Pressable>
          ),
        }}
      />

      <SearchBar value={search} onChangeText={setSearch} />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard 
            item={item} 
            onPress={() => router.push({ pathname: '/editor', params: { id: item.id } })} 
            onLongPress={() => handleLongPress(item.id, item.isPinned)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              {search ? 'No notes match your search' : 'No notes yet. Tap + to create one!'}
            </Text>
          </View>
        }
      />

      <FloatingButton onPress={() => router.push('/editor')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    marginRight: 10,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    maxWidth: '80%',
  },
});
