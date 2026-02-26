"use server";

import { PointerArea } from "@/utils/pointerArea";

export type ReportData = {
  data: ReportType[];
  count: number;
};

export type GeneralReport = {
  id: number;
  auditor: string;
  fecha: string;
  semana: string;
  linea?: string;
  coord?: string;
  picker?: string;
  ubicacion?: string;
  respuestas: boolean[];
};

export type EolaReport = {
  numOrden: string;
  auditor: string;
  fecha: string;
  semana: string;
  uniNegocio: string;
  linea: string;
};

export type NcrReport = {
  numNcr: string;
  fecha: string;
  semana: string;
  numParte: string;
  proveedor: string;
};

export type RacReport = {
  numRac: number;
  fecha: string;
  estado: string;
  ponderancia: string;
  area: string;
};

export type UserData = {
  data: UserType[];
  count: number;
};

export type UserType = {
  id: number
  numEmpleado: string;
  nombre: string;
  email: string;
  rol: string;
};

export type ReportType =
  | { kind: "general"; data: GeneralReport }
  | { kind: "eola"; data: EolaReport }
  | { kind: "ncr"; data: NcrReport }
  | { kind: "rac"; data: RacReport };

export async function getReports({
  pointer,
}: {
  pointer: PointerArea;
}): Promise<ReportData> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  switch (pointer) {
    case "baldwin-state":
      return {
        data: [
          {
            kind: "general",
            data: {
              id: 1,
              auditor: "Pirita Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              coord: "Hexidoth",
              respuestas: [
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
              ],
            },
          },
          {
            kind: "general",
            data: {
              id: 2,
              auditor: "Pirita Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              coord: "Hexidoth",
              respuestas: [
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
              ],
            },
          },
          {
            kind: "general",
            data: {
              id: 3,
              auditor: "Pirita Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              coord: "Hexidoth",
              respuestas: [
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
              ],
            },
          },
          {
            kind: "general",
            data: {
              id: 4,
              auditor: "Pirita Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              coord: "Hexidoth",
              respuestas: [
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
              ],
            },
          },
          {
            kind: "general",
            data: {
              id: 5,
              auditor: "Pirita Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              coord: "Hexidoth",
              respuestas: [
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
              ],
            },
          },
          {
            kind: "general",
            data: {
              id: 6,
              auditor: "Pirita Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              coord: "Hexidoth",
              respuestas: [
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
              ],
            },
          },
        ],
        count: 1,
      };

    case "baldwin-reserve-supply":
      return {
        data: [
          {
            kind: "general",
            data: {
              id: 1,
              auditor: "Cornalina Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              picker: "01",
              respuestas: [true, false, true, false, true, false, true, false],
            },
          },
        ],
        count: 1,
      };

    case "baldwin-reserve-stacking":
      return {
        data: [
          {
            kind: "general",
            data: {
              id: 1,
              auditor: "Nau Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              respuestas: [
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
              ],
            },
          },
        ],
        count: 1,
      };

    case "baldwin-reserve-packing":
      return {
        data: [
          {
            kind: "general",
            data: {
              id: 1,
              auditor: "Gravity Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              respuestas: [
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
              ],
            },
          },
        ],
        count: 1,
      };

    case "baldwin-reserve-general":
      return {
        data: [
          {
            kind: "general",
            data: {
              id: 1,
              auditor: "Fran Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              respuestas: [true, false, true, false],
            },
          },
        ],
        count: 1,
      };

    case "display-area":
      return {
        data: [
          {
            kind: "general",
            data: {
              id: 1,
              auditor: "Nirvana Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              respuestas: [true, false, true, false, true, false],
            },
          },
        ],
        count: 1,
      };

    case "pizza-tray":
      return {
        data: [
          {
            kind: "general",
            data: {
              id: 1,
              auditor: "Tentalet Dreemurr",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              respuestas: [true, false, true, false, true],
            },
          },
        ],
        count: 1,
      };

    case "eola":
      return {
        data: [
          {
            kind: "eola",
            data: {
              numOrden: "123456",
              auditor: "Hexidoth",
              fecha: "01-01-2025",
              semana: "01",
              linea: "01",
              uniNegocio: "Electronics",
            },
          },
        ],
        count: 1,
      };

    case "ncr":
      return {
        data: [
          {
            kind: "ncr",
            data: {
              numNcr: "123456",
              fecha: "01-01-2025",
              semana: "01",
              numParte: "123456",
              proveedor: "Pentadoth",
            },
          },
        ],
        count: 1,
      };

    case "rac":
      return {
        data: [
          {
            kind: "rac",
            data: {
              numRac: 1,
              fecha: "01-01-2025",
              estado: "ABIERTO",
              ponderancia: "LOW",
              area: "Electronics",
            },
          },
          {
            kind: "rac",
            data: {
              numRac: 2,
              fecha: "01-01-2025",
              estado: "ABIERTO",
              ponderancia: "MEDIUM",
              area: "Finishing",
            },
          },
          {
            kind: "rac",
            data: {
              numRac: 3,
              fecha: "01-01-2025",
              estado: "ABIERTO",
              ponderancia: "HIGH",
              area: "Laca",
            },
          },
        ],
        count: 1,
      };

    default:
      return {
        data: [],
        count: 0,
      };
  }
}

export async function getUsers(): Promise<UserData> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    data: [
      {
        id: 1,
        numEmpleado: "2308",
        nombre: "Pirita Dreemurr",
        email: "pirita@gmail.com",
        rol: "Admin",
      },
      {
        id: 2,
        numEmpleado: "512",
        nombre: "Cornalina Dreemurr",
        email: "cornalina@gmail.com",
        rol: "Calidad",
      },
    ],
    count: 2,
  };
}
