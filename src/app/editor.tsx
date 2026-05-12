import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './_layout';
import { useEditor } from '../hooks/useEditor';
import { NoteInput } from '../components/NoteInput';

export default function EditorScreen() {
  const { theme } = useTheme();
  const { height } = useWindowDimensions();
  const {
    title,
    setTitle,
    content,
    setContent,
    contentInputRef,
    handleSave,
    handleContentPress,
  } = useEditor();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Stack.Screen
        options={{
          title: '',
          headerRight: () => (
            <Pressable 
              onPress={handleSave} 
              style={styles.saveButton}
            >
              <Ionicons name="checkmark" size={28} color={theme.primary} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { minHeight: height - 100 }]}
        keyboardShouldPersistTaps="handled"
      >
        <NoteInput
          ref={contentInputRef}
          title={title}
          onTitleChange={setTitle}
          content={content}
          onContentChange={setContent}
          onContentPress={handleContentPress}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  saveButton: {
    marginRight: 10,
  },
  scrollContent: {
    padding: 20,
  },
});
