import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WasteFilter } from "../types/enums";

// Define the shape of your global state
import type { AppState } from "../types/app";

export const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {

  // Default values for SSR
  const [filter, setFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [ownerFilter, setOwnerFilter] = useState<string>('');
  const [wasteFilter, setWasteFilter] = useState<WasteFilter>(WasteFilter.All);
  const [jobIdFilter, setJobIdFilter] = useState<string>('');

  // On client, update state from localStorage after mount
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setFilter(localStorage.getItem('filter') || '');
      setTypeFilter(localStorage.getItem('typeFilter') || '');
      setOwnerFilter(localStorage.getItem('ownerFilter') || '');
  const storedWaste = localStorage.getItem('wasteFilter');
  setWasteFilter((storedWaste && Object.values(WasteFilter).includes(storedWaste as WasteFilter)) ? storedWaste as WasteFilter : WasteFilter.All);
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
  setWasteFilter(WasteFilter.All);
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
