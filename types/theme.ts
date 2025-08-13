// Theme context types

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
