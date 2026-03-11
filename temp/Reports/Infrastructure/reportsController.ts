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

    console.log("Entrando por selectReports...", query);

    switch (pointer) {
      case "baldwin-state":
        return {
          data: [
            {
              kind: "general",
              data: {
                id: 1,
                usuario_id: 1,
                usuario_nombre: "Pirita Dreemurr",
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
                type: "baldwin-state",
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
                id: 2,
                usuario_id: 2,
                usuario_nombre: "Cornalina Dreemurr",
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
                type: "baldwin-reserve-supply",
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
                id: 3,
                usuario_id: 3,
                usuario_nombre: "Nau Dreemurr",
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
                type: "baldwin-reserve-stacking",
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
                id: 4,
                usuario_id: 4,
                usuario_nombre: "Gravity Dreemurr",
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
                type: "baldwin-reserve-packing",
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
                id: 5,
                usuario_id: 5,
                usuario_nombre: "Fran Dreemurr",
                fecha: "01-01-2025",
                semana: "01",
                linea: "01",
                respuestas: [true, false, true, false],
                comentarios: "",
                type: "baldwin-reserve-general",
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
                id: 6,
                usuario_id: 6,
                usuario_nombre: "Nirvana Dreemurr",
                fecha: "01-01-2025",
                semana: "01",
                linea: "01",
                worktable: "WT-01",
                respuestas: [true, false, true, false, true, false],
                comentarios: "",
                type: "display-area",
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
                id: 7,
                usuario_id: 7,
                usuario_nombre: "Tentalet Dreemurr",
                fecha: "01-01-2025",
                semana: "01",
                linea: "01",
                nivel: 1,
                respuestas: [true, false, true, false, true],
                comentarios: "",
                type: "pizza-tray",
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
                id: 8,
                numOrden: "123456",
                usuario_id: 8,
                usuario_nombre: "Hexadoth",
                fecha: "01-01-2025",
                semana: "01",
                linea: "01",
                uniNegocio: "Electronics",
                cantAceptada: 1000,
                cantInspeccionada: 1000,
                comentarios: "",
                sizeOrden: 1000,
                sku: "888",
                tipo: "EOLA",
                upc: "9999",
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
                id: 9,
                usuario_id: 9,
                usuario_nombre: "Pentadoth",
                numNcr: "123456",
                fecha: "01-01-2025",
                semana: "01",
                numParte: "123456",
                proveedor: "Alguna empresa",
                defecto: "Esta pieza no viene bien!",
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
                id: 10,
                usuario_id: 10,
                usuario_nombre: "Tetradoth",
                fecha: "01-01-2025",
                estado: "ABIERTO",
                ponderancia: "LOW",
                area: "Electronics",
                codigoFecha: "01",
                descProb: "Algo salió muy mal!",
                descProd: "Pro",
                numParte: "Tipo A",
                porcFalla: "50",
                responsable: "Cornalina",
                sizeLote: 500,
              },
            },
          ],
          count: 1,
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

    const auditor_id = formData.get("auditor_id");
    const linea = formData.get("linea");
    const coordinador = formData.get("coord");
    const picker = formData.get("picker");
    const ubicacion = formData.get("ubicacion");
    const nivel = formData.get("nivel");
    const worktable = formData.get("worktable");
    const comentarios = formData.get("comentarios");

    const file = formData.get("archivo") as File | null;

    console.log({
      auditor_id: auditor_id,
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
  } catch {
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
    const id = formData.get("id");
    const usuario_id = formData.get("usuario_id");
    const ncr = formData.get("ncr");
    const numParte = formData.get("numParte");
    const proveedor = formData.get("proveedor");
    const defecto = formData.get("defecto");

    const file = formData.get("archivo") as File | null;

    console.log({
      id: id,
      usuario_id: usuario_id,
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
  } catch {
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
    const id = formData.get("id");
    const usuario_id = formData.get("usuario_id");
    const estado = formData.get("estado");
    const ponderancia = formData.get("ponderancia");
    const area = formData.get("area");

    const responsable = formData.get("responsable");
    const numParte = formData.get("numParte");
    const descProd = formData.get("descProd");
    const sizeLote = formData.get("sizeLote");
    const codigoFecha = formData.get("codigoFecha");
    const porcFalla = formData.get("porcFalla");
    const descProb = formData.get("descProb");

    const file = formData.get("archivo") as File | null;

    console.log({
      id: id,
      usuario_id: usuario_id,
      estado: estado,
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
  } catch {
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
    const id = formData.get("id");
    const usuario_id = formData.get("usuario_id");
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
      id: id,
      usuario_id: usuario_id,
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
            usuario_id: 1,
            usuario_nombre: "Pirita Dreemurr",
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
            type: "baldwin-state",
          },
        };

      case "baldwin-reserve-supply":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 2,
            usuario_id: 2,
            usuario_nombre: "Cornalina Dreemurr",
            fecha: "01-01-2025",
            semana: "01",
            picker: "01",
            respuestas: [true, false, true, false, true, false, true, false],
            comentarios: "",
            type: "baldwin-reserve-supply",
          },
        };

      case "baldwin-reserve-stacking":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 3,
            usuario_id: 3,
            usuario_nombre: "Nau Dreemurr",
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
            type: "baldwin-reserve-stacking",
          },
        };

      case "baldwin-reserve-packing":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 4,
            usuario_id: 4,
            usuario_nombre: "Gravity Dreemurr",
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
            type: "baldwin-reserve-packing",
          },
        };

      case "baldwin-reserve-general":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 5,
            usuario_id: 5,
            usuario_nombre: "Fran Dreemurr",
            fecha: "01-01-2025",
            semana: "01",
            linea: "01",
            respuestas: [true, false, true, false],
            comentarios: "",
            type: "baldwin-reserve-general",
          },
        };

      case "display-area":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 6,
            usuario_id: 6,
            usuario_nombre: "Nirvana Dreemurr",
            fecha: "01-01-2025",
            semana: "01",
            linea: "01",
            worktable: "WT-01",
            respuestas: [true, false, true, false, true, false],
            comentarios: "",
            type: "display-area",
          },
        };

      case "pizza-tray":
        return {
          ok: true,
          message: "Reporte obtenido correctamente",
          report: {
            id: 7,
            usuario_id: 7,
            usuario_nombre: "Tentalet Dreemurr",
            fecha: "01-01-2025",
            semana: "01",
            linea: "01",
            nivel: 1,
            respuestas: [true, false, true, false, true],
            comentarios: "",
            type: "pizza-tray",
          },
        };

      default:
        return {
          ok: false,
          message: "Ocurrió un error al buscar el reporte",
          report: {
            id: 0,
            usuario_id: 0,
            usuario_nombre: "",
            fecha: "",
            respuestas: [],
            semana: "",
            type: "baldwin-state",
          },
        };
    }
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al buscar el reporte",
      report: {
        id: 0,
        usuario_id: 0,
        usuario_nombre: "",
        fecha: "",
        respuestas: [],
        semana: "",
        type: "baldwin-state",
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
        id: 8,
        numOrden: "123456",
        usuario_id: 8,
        usuario_nombre: "Hexadoth",
        fecha: "01-01-2025",
        semana: "01",
        linea: "01",
        uniNegocio: "Electronics",
        cantAceptada: 1000,
        cantInspeccionada: 1000,
        comentarios: "",
        sizeOrden: 1000,
        sku: "888",
        tipo: "EOLA",
        upc: "9999",
      },
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al buscar el reporte",
      report: {
        id: 0,
        numOrden: "",
        usuario_id: 0,
        usuario_nombre: "",
        fecha: "",
        semana: "",
        linea: "",
        uniNegocio: "",
        cantAceptada: 0,
        cantInspeccionada: 0,
        comentarios: "",
        sizeOrden: 0,
        sku: "",
        tipo: "",
        upc: "",
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
        id: 9,
        usuario_id: 9,
        usuario_nombre: "Pentadoth",
        numNcr: "123456",
        fecha: "01-01-2025",
        semana: "01",
        numParte: "123456",
        proveedor: "Alguna empresa",
        defecto: "Esta pieza no viene bien!",
      },
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al buscar el reporte",
      report: {
        id: 0,
        usuario_id: 0,
        usuario_nombre: "",
        numNcr: "",
        fecha: "",
        semana: "",
        numParte: "",
        proveedor: "",
        defecto: "",
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
        id: 10,
        usuario_id: 10,
        usuario_nombre: "Tetradoth",
        fecha: "01-01-2025",
        estado: "ABIERTO",
        ponderancia: "LOW",
        area: "Electronics",
        codigoFecha: "01",
        descProb: "Algo salió muy mal!",
        descProd: "Pro",
        numParte: "Tipo A",
        porcFalla: "50",
        responsable: "Cornalina",
        sizeLote: 500,
      },
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al buscar el reporte",
      report: {
        id: 0,
        usuario_id: 0,
        usuario_nombre: "",
        fecha: "",
        estado: "",
        ponderancia: "",
        area: "",
        codigoFecha: "",
        descProb: "",
        descProd: "",
        numParte: "",
        porcFalla: "",
        responsable: "",
        sizeLote: 0,
      },
    };
  }
}
