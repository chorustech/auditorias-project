import { FieldArray } from "react-hook-form";

export type EolaFormValues = {
  id: number;
  usuario_id: number;
  uniNegocio: string;
  linea: string;
  tipo: string;
  numOrden?: string;
  sku: string;
  upc: string;
  sizeOrden: number;
  cantInspeccionada: number;
  cantAceptada: number;
  comentarios: string;
  archivo?: FieldArray;
};
