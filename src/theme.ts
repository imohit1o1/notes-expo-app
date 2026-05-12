export const colors = {
  dark: {
    background: '#000000',
    surface: '#121212',
    surfaceSecondary: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    primary: '#BB86FC',
    accent: '#03DAC6',
    border: '#2C2C2C',
    pinned: '#FFD700',
  },
  light: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceSecondary: '#EEEEEE',
    text: '#000000',
    textSecondary: '#666666',
    primary: '#6200EE',
    accent: '#03DAC6',
    border: '#E0E0E0',
    pinned: '#FFA000',
  },
};

export type ThemeColors = typeof colors.dark;
