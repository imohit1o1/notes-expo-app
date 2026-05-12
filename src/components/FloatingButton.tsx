import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../app/_layout';

interface FloatingButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const FloatingButton = ({ onPress, icon = 'add' }: FloatingButtonProps) => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[styles.fab, { backgroundColor: theme.primary }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={30} color="#000" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
