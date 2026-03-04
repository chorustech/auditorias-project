import { FieldArray } from "react-hook-form";

export type NcrFormValues = {
  ncr: string;
  numParte: string;
  proveedor: string;
  defecto: string;
  archivo?: FieldArray;
};
