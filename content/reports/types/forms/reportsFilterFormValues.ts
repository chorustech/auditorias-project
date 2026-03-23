import { DateRange } from "react-day-picker";

export type ReportsFilterFormValues = {
  page: number;
  perPage: string;
  order: "Ascendente" | "Descendente";
  orderBy: "ID" | "Fecha" | "Empleado";
  filterBy: "ID" | "Fecha" | "Entre fechas" | "Ninguno";
  operator?: "=" | "!=" | "<" | "<=" | ">" | ">=";
  id?: number;
  fecha_unica?: Date;
  fecha_intervalo?: DateRange;
};
