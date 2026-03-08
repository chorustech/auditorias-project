import { FieldArray } from "react-hook-form";

export type RacFormValues = {
  id: number;
  usuario_id: number;
  estado: string;
  responsable: string;
  numParte: string;
  descProd: string;
  sizeLote: number;
  ponderancia: string;
  codigoFecha: string;
  area: string;
  porcFalla: string;
  descProb: string;
  archivo?: FieldArray;
};
