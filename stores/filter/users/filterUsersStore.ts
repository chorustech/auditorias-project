import { UserPrimitive } from "@/src/users";
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
    value: string | number | boolean;
  }[];
}

type Operator = "=" | "!=" | "<" | "<=" | ">" | ">=";

interface FilterStore {
  filter: Filter<UserPrimitive> | null;
  setFilter: (data: Filter<UserPrimitive>) => void;
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
  setFilter: (data: Filter<UserPrimitive>) => set({ filter: data }),
}));
