// App context and filter types

export interface AppState {
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

export type ActiveFilter = { key: string; label: string };
