// Theme context types

export type Theme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
