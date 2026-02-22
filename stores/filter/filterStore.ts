import { create } from "zustand";

export interface Filter {
  perPage: number;
  page: number;
  order?: string;
  orderBy?: string;
  checkFilters?: boolean;
  filters?: {
    campo: string;
    operador: "=" | "!=" | "<" | "<=" | ">" | ">=";
    valor: string | number;
  }[];
}

interface FilterStore {
  filter: Filter | null;
  setFilter: (data: Filter) => void;
}

export const useFilter = create<FilterStore>((set) => ({
  filter: {
    perPage: 10,
    page: 0,
    order: "desc",
    orderBy: "id",
    checkFilters: false,
    filters: [],
  },
  setFilter: (data: Filter) => set({ filter: data }),
}));
