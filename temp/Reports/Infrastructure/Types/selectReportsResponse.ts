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
  auditor: string;
  fecha: string;
  semana: string;
  linea?: string;
  coord?: string;
  picker?: string;
  ubicacion?: string;
  worktable?: string;
  nivel?: number;
  respuestas: boolean[];
  comentarios?: string
};

export type EolaReport = {
  id?: number;
  numOrden: string;
  auditor: string;
  fecha: string;
  semana: string;
  uniNegocio: string;
  linea: string;
};

export type NcrReport = {
  id?: number;
  numNcr: string;
  fecha: string;
  semana: string;
  numParte: string;
  proveedor: string;
};

export type RacReport = {
  id?: number;
  numRac: number;
  fecha: string;
  estado: string;
  ponderancia: string;
  area: string;
};
