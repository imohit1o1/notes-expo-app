import { NoteItem } from './types';

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: '1',
    title: 'Welcome to Notes',
    text: 'Tap the plus button to create a new one. This app uses local state now.',
    createdAt: new Date().toISOString(),
    isPinned: true,
  },
  {
    id: '2',
    title: 'Project Ideas',
    text: '1. Build a notes app with Expo\n2. Create a developer portfolio\n3. Learn Three.js for 3D web apps',
    createdAt: new Date().toISOString(),
    isPinned: false,
  },
];
