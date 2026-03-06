"use server";

import { PointerArea } from "@/utils/pointerArea";
import {
  EolaReport,
  GeneralReport,
  NcrReport,
  RacReport,
  SelectReportsResponse,
} from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";
import { IQuery } from "@/temp/Shared/Domain/Interfaces/IQuery";

export async function selectReports({
  pointer,
  query,
}: {
  pointer: PointerArea;
  query: IQuery<GeneralReport & EolaReport & NcrReport & RacReport>;
}): Promise<SelectReportsResponse> {
  try {
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
                comentarios: "",
              },
            },
          ],
          count: 1,
          ok: true,
          message: "Reportes obtenidos correctamente",
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
                respuestas: [
                  true,
                  false,
                  true,
                  false,
                  true,
                  false,
                  true,
                  false,
                ],
                comentarios: "",
              },
            },
          ],
          count: 1,
          ok: true,
          message: "Reportes obtenidos correctamente",
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
                comentarios: "",
              },
            },
          ],
          count: 1,
          ok: true,
          message: "Reportes obtenidos correctamente",
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
                comentarios: "",
              },
            },
          ],
          count: 1,
          ok: true,
          message: "Reportes obtenidos correctamente",
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
                comentarios: "",
              },
            },
          ],
          count: 1,
          ok: true,
          message: "Reportes obtenidos correctamente",
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
                worktable: "WT-01",
                respuestas: [true, false, true, false, true, false],
                comentarios: "",
              },
            },
          ],
          count: 1,
          ok: true,
          message: "Reportes obtenidos correctamente",
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
                nivel: 1,
                respuestas: [true, false, true, false, true],
                comentarios: "",
              },
            },
          ],
          count: 1,
          ok: true,
          message: "Reportes obtenidos correctamente",
        };

      case "eola":
        return {
          data: [
            {
              kind: "eola",
              data: {
                id: 1,
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
          ok: true,
          message: "Reportes obtenidos correctamente",
        };

      case "ncr":
        return {
          data: [
            {
              kind: "ncr",
              data: {
                id: 1,
                numNcr: "123456",
                fecha: "01-01-2025",
                semana: "01",
                numParte: "123456",
                proveedor: "Pentadoth",
              },
            },
          ],
          count: 1,
          ok: true,
          message: "Reportes obtenidos correctamente",
        };

      case "rac":
        return {
          data: [
            {
              kind: "rac",
              data: {
                id: 1,
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
                id: 2,
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
                id: 3,
                numRac: 3,
                fecha: "01-01-2025",
                estado: "ABIERTO",
                ponderancia: "HIGH",
                area: "Laca",
              },
            },
          ],
          count: 3,
          ok: true,
          message: "Reportes obtenidos correctamente",
        };

      default:
        return {
          data: [],
          count: 0,
          ok: false,
          message: "Ocurrió un error al obtener los reportes",
        };
    }
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al obtener los reportes",
      data: [],
      count: 0,
    };
  }
}

export async function deleteReport(
  id: number,
): Promise<{ ok: boolean; message: string }> {
  try {
    // Simular delay del backend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      ok: true,
      message: "Se eliminó el reporte correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al eliminar el reporte",
    };
  }
}

export async function insertReport(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const respuestasRaw = formData.get("respuestas") as string;
    const respuestas: boolean[] = JSON.parse(respuestasRaw);

    const linea = formData.get("linea");
    const coordinador = formData.get("coord");
    const picker = formData.get("picker");
    const ubicacion = formData.get("ubicacion");
    const nivel = formData.get("nivel");
    const worktable = formData.get("worktable");
    const comentarios = formData.get("comentarios");

    const file = formData.get("archivo") as File | null;

    console.log({
      respuestas: respuestas,
      linea: linea,
      coordinador: coordinador,
      picker: picker,
      ubicacion: ubicacion,
      nivel: nivel,
      worktable: worktable,
      comentarios: comentarios,
      file: file ? `Nombre: ${file.name}, Tipo: ${file.type}` : null,
    });

    return {
      ok: true,
      message: "Reporte insertado correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Ocurrió un error al ingresar el reporte",
    };
  }
}

export async function insertNcrReport(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const ncr = formData.get("ncr");
    const numParte = formData.get("numParte");
    const proveedor = formData.get("proveedor");
    const defecto = formData.get("defecto");

    const file = formData.get("archivo") as File | null;

    console.log({
      ncr: ncr,
      numParte: numParte,
      proveedor: proveedor,
      defecto: defecto,
      file: file ? `Nombre: ${file.name}, Tipo: ${file.type}` : null,
    });

    return {
      ok: true,
      message: "Reporte insertado correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Ocurrió un error al ingresar el reporte",
    };
  }
}

export async function insertRacReport(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const responsable = formData.get("responsable");
    const numParte = formData.get("numParte");
    const descProd = formData.get("descProd");
    const sizeLote = formData.get("sizeLote");
    const ponderancia = formData.get("ponderancia");
    const codigoFecha = formData.get("codigoFecha");
    const area = formData.get("area");
    const porcFalla = formData.get("porcFalla");
    const descProb = formData.get("descProb");

    const file = formData.get("archivo") as File | null;

    console.log({
      responsable: responsable,
      numParte: numParte,
      descProd: descProd,
      sizeLote: sizeLote,
      ponderancia: ponderancia,
      codigoFecha: codigoFecha,
      area: area,
      porcFalla: porcFalla,
      descProb: descProb,
      file: file ? `Nombre: ${file.name}, Tipo: ${file.type}` : null,
    });

    return {
      ok: true,
      message: "Reporte insertado correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Ocurrió un error al ingresar el reporte",
    };
  }
}

export async function insertEolaReport(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const unidadNegocio = formData.get("uniNegocio");
    const linea = formData.get("linea");
    const tipo = formData.get("tipo");
    const sku = formData.get("sku");
    const upc = formData.get("upc");
    const sizeOrden = formData.get("sizeOrden");
    const cantInspeccionada = formData.get("cantInspeccionada");
    const cantAceptada = formData.get("cantAceptada");
    const numOrden = formData.get("numOrden");
    const comentarios = formData.get("comentarios");

    const file = formData.get("archivo") as File | null;

    console.log({
      unidadNegocio: unidadNegocio,
      linea: linea,
      tipo: tipo,
      sku: sku,
      upc: upc,
      sizeOrden: sizeOrden,
      cantInspeccionada: cantInspeccionada,
      cantAceptada: cantAceptada,
      numOrden: numOrden,
      comentarios: comentarios,
      file: file ? `Nombre: ${file.name}, Tipo: ${file.type}` : null,
    });

    return {
      ok: true,
      message: "Reporte insertado correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Ocurrió un error al ingresar el reporte",
    };
  }
}

export async function selectGeneralReportById({
  id,
  pointer,
}: {
  id: number;
  pointer: PointerArea;
}): Promise<{ ok: boolean; message: string; report: GeneralReport }> {
  try {
    // Simular delay del backend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    switch (pointer) {
      case "baldwin-state":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
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
            comentarios: "",
          },
        };

      case "baldwin-reserve-supply":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 1,
            auditor: "Cornalina Dreemurr",
            fecha: "01-01-2025",
            semana: "01",
            picker: "01",
            respuestas: [true, false, true, false, true, false, true, false],
            comentarios: "",
          },
        };

      case "baldwin-reserve-stacking":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
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
            comentarios: "",
          },
        };

      case "baldwin-reserve-packing":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
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
            comentarios: "",
          },
        };

      case "baldwin-reserve-general":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 1,
            auditor: "Fran Dreemurr",
            fecha: "01-01-2025",
            semana: "01",
            linea: "01",
            respuestas: [true, false, true, false],
            comentarios: "",
          },
        };

      case "display-area":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 1,
            auditor: "Nirvana Dreemurr",
            fecha: "01-01-2025",
            semana: "01",
            linea: "01",
            worktable: "WT-01",
            respuestas: [true, false, true, false, true, false],
            comentarios: "",
          },
        };

      case "pizza-tray":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 1,
            auditor: "Tentalet Dreemurr",
            fecha: "01-01-2025",
            semana: "01",
            linea: "01",
            nivel: 1,
            respuestas: [true, false, true, false, true],
            comentarios: "",
          },
        };

      default:
        return {
          ok: false,
          message: "Ocurrió un error al buscar el reporte",
          report: {
            id: 0,
            auditor: "",
            fecha: "",
            respuestas: [],
            semana: "",
          },
        };
    }
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al buscar el reporte",
      report: {
        id: 0,
        auditor: "",
        fecha: "",
        respuestas: [],
        semana: "",
      },
    };
  }
}

export async function selectEolaReportById(
  id: number,
): Promise<{ ok: boolean; message: string; report: EolaReport }> {
  try {
    // Simular delay del backend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      ok: true,
      message: "Reporte obtenido correctamente",
      report: {
        id: 1,
        numOrden: "123456",
        auditor: "Hexidoth",
        fecha: "01-01-2025",
        semana: "01",
        linea: "01",
        uniNegocio: "Electronics",
      },
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al buscar el reporte",
      report: {
        id: 0,
        numOrden: "",
        auditor: "",
        fecha: "",
        semana: "",
        linea: "",
        uniNegocio: "",
      },
    };
  }
}

export async function selectNcrReportById(
  id: number,
): Promise<{ ok: boolean; message: string; report: NcrReport }> {
  try {
    // Simular delay del backend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      ok: true,
      message: "Reporte obtenido correctamente",
      report: {
        id: 1,
        numNcr: "123456",
        fecha: "01-01-2025",
        semana: "01",
        numParte: "123456",
        proveedor: "Pentadoth",
      },
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al buscar el reporte",
      report: {
        id: 0,
        numNcr: "",
        fecha: "",
        semana: "",
        numParte: "",
        proveedor: "",
      },
    };
  }
}

export async function selectRacReportById(
  id: number,
): Promise<{ ok: boolean; message: string; report: RacReport }> {
  try {
    // Simular delay del backend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      ok: true,
      message: "Reporte obtenido correctamente",
      report: {
        id: 1,
        numRac: 1,
        fecha: "01-01-2025",
        estado: "ABIERTO",
        ponderancia: "LOW",
        area: "Electronics",
      },
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al buscar el reporte",
      report: {
        id: 0,
        numRac: 0,
        fecha: "",
        estado: "",
        ponderancia: "",
        area: "",
      },
    };
  }
}
