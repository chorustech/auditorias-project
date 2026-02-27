import { FieldArray } from "react-hook-form";

export type ReportFormValues = {
  linea?: string;
  coord?: string;
  picker?: string;
  ubicacion?: string;
  worktable?: string;
  nivel?: number;
  respuestas: boolean[];
  comentarios: string;
  archivo?: FieldArray;
};
