import { FieldArray } from "react-hook-form";

export type NcrFormValues = {
  id: number;
  usuario_id: number
  ncr: string;
  numParte: string;
  proveedor: string;
  defecto: string;
  archivo?: FieldArray;
};
