import { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export const useEditor = () => {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const contentInputRef = useRef<TextInput>(null);

  const handleSave = () => {
    // Logic for saving can be added here once a persistence layer is chosen
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
