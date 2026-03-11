import { PointerArea } from "@/utils/pointerArea";


export type SelectReportsResponse = {
  data: ReportType[];
  count: number;
  ok: boolean;
  message: string;
};

export type ReportType =
  | { kind: "general"; data: GeneralReport }
  | { kind: "eola"; data: EolaReport }
  | { kind: "ncr"; data: NcrReport }
  | { kind: "rac"; data: RacReport };

export type GeneralReport = {
  id: number;
  usuario_id: number;
  usuario_nombre: string;
  fecha: string;
  semana: string;
  linea?: string;
  coord?: string;
  picker?: string;
  ubicacion?: string;
  worktable?: string;
  nivel?: number;
  respuestas: boolean[];
  comentarios?: string;
  type: PointerArea
};

export type EolaReport = {
  id?: number;
  numOrden: string;
  usuario_id: number;
  usuario_nombre: string;
  fecha: string;
  semana: string;
  uniNegocio: string;
  linea: string;
  tipo: string;
  sku: string;
  upc: string;
  sizeOrden: number;
  cantInspeccionada: number;
  cantAceptada: number;
  comentarios: string;
};

export type NcrReport = {
  id?: number;
  usuario_id: number;
  usuario_nombre: string;
  numNcr: string;
  fecha: string;
  semana: string;
  numParte: string;
  proveedor: string;
  defecto: string;
};

export type RacReport = {
  id?: number;
  usuario_id: number;
  usuario_nombre: string;
  fecha: string;
  estado: string;
  ponderancia: string;
  area: string;
  responsable: string;
  numParte: string;
  descProd: string;
  sizeLote: number;
  codigoFecha: string;
  porcFalla: string;
  descProb: string;
};
