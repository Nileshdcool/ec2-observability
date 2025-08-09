import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your global state
interface AppState {
  filter: string;
  setFilter: (value: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<string>('');

  return (
    <AppContext.Provider value={{ filter, setFilter }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
