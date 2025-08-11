import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your global state
interface AppState {
  filter: string;
  setFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  ownerFilter: string;
  setOwnerFilter: (value: string) => void;
  wasteFilter: string;
  setWasteFilter: (value: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [ownerFilter, setOwnerFilter] = useState<string>('');
  const [wasteFilter, setWasteFilter] = useState<string>('All');

  return (
    <AppContext.Provider value={{
      filter,
      setFilter,
      typeFilter,
      setTypeFilter,
      ownerFilter,
      setOwnerFilter,
      wasteFilter,
      setWasteFilter
    }}>
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
