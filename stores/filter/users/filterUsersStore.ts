import { UserType } from "@/temp/Users/Infrastructure/Types/userData";
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
  filter: Filter<UserType> | null;
  setFilter: (data: Filter<UserType>) => void;
}

export const useUsersFilter = create<FilterStore>((set) => ({
  filter: {
    perPage: 10,
    page: 0,
    order: "desc",
    orderBy: "id",
    checkFilters: false,
    filters: [],
  },
  setFilter: (data: Filter<UserType>) => set({ filter: data }),
}));
