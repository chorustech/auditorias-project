import {
  EolaReport,
  GeneralReport,
  NcrReport,
  RacReport,
} from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";
import { create } from "zustand";

export interface Filter<T> {
  perPage: number;
  page: number;
  order: "asc" | "desc";
  orderBy: keyof T;
  checkFilters: boolean;
  filters: {
    field: keyof T;
    operator: Operator;
    value: string | number;
  }[];
}

type Operator = "=" | "!=" | "<" | "<=" | ">" | ">=";

interface FilterStore {
  filter: Filter<GeneralReport & EolaReport & NcrReport & RacReport> | null;
  setFilter: (
    data: Filter<GeneralReport & EolaReport & NcrReport & RacReport>,
  ) => void;
}

export const useReportsFilter = create<FilterStore>((set) => ({
  filter: {
    perPage: 10,
    page: 0,
    order: "desc",
    orderBy: "id",
    checkFilters: false,
    filters: [],
  },
  setFilter: (
    data: Filter<GeneralReport & EolaReport & NcrReport & RacReport>,
  ) => set({ filter: data }),
}));
