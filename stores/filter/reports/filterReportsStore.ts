import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import { Metadata } from "@/src/reporte-auditoria/domain/entities";
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
  filter: Filter<ReporteAuditoriaConDetalles<Metadata>> | null;
  setFilter: (
    data: Filter<ReporteAuditoriaConDetalles<Metadata>>,
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
    data: Filter<ReporteAuditoriaConDetalles<Metadata>>,
  ) => set({ filter: data }),
}));
