import React from "react";
import { useTheme } from "../lib/ThemeContext";
import { Theme } from "../types/theme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
  {theme === Theme.Dark ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
