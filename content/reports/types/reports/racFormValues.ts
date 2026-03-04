import { FieldArray } from "react-hook-form";

export type RacFormValues = {
  responsable: string;
  numParte: string;
  descProd: string;
  sizeLote: number;
  ponderancia: string;
  codigoFecha?: string;
  area: string;
  porcFalla: number;
  descProb: string;
  archivo?: FieldArray;
};
