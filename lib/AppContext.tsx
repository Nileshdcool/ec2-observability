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
  jobIdFilter: string;
  setJobIdFilter: (value: string) => void;
  resetFilters: () => void;
}

export const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {

  // Default values for SSR
  const [filter, setFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [ownerFilter, setOwnerFilter] = useState<string>('');
  const [wasteFilter, setWasteFilter] = useState<string>('All');
  const [jobIdFilter, setJobIdFilter] = useState<string>('');

  // On client, update state from localStorage after mount
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setFilter(localStorage.getItem('filter') || '');
      setTypeFilter(localStorage.getItem('typeFilter') || '');
      setOwnerFilter(localStorage.getItem('ownerFilter') || '');
      setWasteFilter(localStorage.getItem('wasteFilter') || 'All');
      setJobIdFilter(localStorage.getItem('jobIdFilter') || '');
    }
  }, []);

  // Persist to localStorage on change (client only)
  React.useEffect(() => { if (typeof window !== "undefined" && window.localStorage) localStorage.setItem('filter', filter); }, [filter]);
  React.useEffect(() => { if (typeof window !== "undefined" && window.localStorage) localStorage.setItem('typeFilter', typeFilter); }, [typeFilter]);
  React.useEffect(() => { if (typeof window !== "undefined" && window.localStorage) localStorage.setItem('ownerFilter', ownerFilter); }, [ownerFilter]);
  React.useEffect(() => { if (typeof window !== "undefined" && window.localStorage) localStorage.setItem('wasteFilter', wasteFilter); }, [wasteFilter]);
  React.useEffect(() => { if (typeof window !== "undefined" && window.localStorage) localStorage.setItem('jobIdFilter', jobIdFilter); }, [jobIdFilter]);

  const resetFilters = () => {
    setFilter('');
    setTypeFilter('');
    setOwnerFilter('');
    setWasteFilter('All');
    setJobIdFilter('');
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem('filter');
      localStorage.removeItem('typeFilter');
      localStorage.removeItem('ownerFilter');
      localStorage.removeItem('wasteFilter');
      localStorage.removeItem('jobIdFilter');
    }
  };

  return (
    <AppContext.Provider value={{
      filter,
      setFilter,
      typeFilter,
      setTypeFilter,
      ownerFilter,
      setOwnerFilter,
      wasteFilter,
      setWasteFilter,
      jobIdFilter,
      setJobIdFilter,
      resetFilters
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
