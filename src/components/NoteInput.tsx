import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { useTheme } from '../app/_layout';

interface NoteInputProps {
  title: string;
  onTitleChange: (text: string) => void;
  content: string;
  onContentChange: (text: string) => void;
  onContentPress: () => void;
}

export const NoteInput = forwardRef<TextInput, NoteInputProps>(
  ({ title, onTitleChange, content, onContentChange, onContentPress }, ref) => {
    const { theme } = useTheme();

    return (
      <Pressable style={styles.container} onPress={onContentPress}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={theme.textSecondary}
          style={[styles.titleInput, { color: theme.text }]}
          value={title}
          onChangeText={onTitleChange}
          multiline
          scrollEnabled={false}
        />

        <TextInput
          ref={ref}
          placeholder="Start typing..."
          placeholderTextColor={theme.textSecondary}
          style={[styles.contentInput, { color: theme.text }]}
          value={content}
          onChangeText={onContentChange}
          multiline
          scrollEnabled={false}
        />
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleInput: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 0,
    borderWidth: 0,
  },
  contentInput: {
    fontSize: 18,
    lineHeight: 26,
    padding: 0,
    borderWidth: 0,
    textAlignVertical: 'top',
  },
});
