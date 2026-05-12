import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { colors, ThemeColors } from "../theme";
import { NotesProvider } from "../context/NotesContext";

type ThemeContextType = {
  theme: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(true); // Default to dark

  const theme = useMemo(() => (isDark ? colors.dark : colors.light), [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <NotesProvider>
        <StatusBar style={isDark ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTintColor: theme.text,
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: theme.background,
            },
          }}
        />
      </NotesProvider>
    </ThemeContext.Provider>
  );
}
