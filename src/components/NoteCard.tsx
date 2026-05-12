import React from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useTheme } from '../app/_layout';
import { NoteItem } from '../types';

import { formatDate } from '../utils/date';

interface NoteCardProps {
  item: NoteItem;
  onPress: () => void;
  onLongPress?: () => void;
}

export const NoteCard = ({ item, onPress, onLongPress }: NoteCardProps) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        {item.isPinned && (
          <AntDesign name="pushpin" size={18} color={theme.pinned} />
        )}
      </View>
      <Text
        style={[styles.cardText, { color: theme.textSecondary }]}
        numberOfLines={2}
      >
        {item.text}
      </Text>
      <Text style={[styles.cardDate, { color: theme.textSecondary }]}>
        {formatDate(item.createdAt)}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardDate: {
    fontSize: 12,
  },
});
