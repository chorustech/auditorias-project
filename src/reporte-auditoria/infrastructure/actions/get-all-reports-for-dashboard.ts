"use server";

import { db } from "@/db";
import { ReporteAuditoriaTable } from "@/db/schemas/reporte-auditoria";
import { AreaTable } from "@/db/schemas/area";
import { eq } from "drizzle-orm";

export async function getAllReportsForDashboard() {
  try {
    const reports = await db
      .select({
        areaNombre: AreaTable.nombre,
        respuestas: ReporteAuditoriaTable.respuestas,
      })
      .from(ReporteAuditoriaTable)
      .innerJoin(AreaTable, eq(ReporteAuditoriaTable.area_id, AreaTable.id));

    return {
      ok: true,
      data: reports,
      message: "",
    };
  } catch (error) {
    console.error("Error fetching reports for dashboard:", error);
    return {
      ok: false,
      data: null,
      message: "No se pudieron obtener los reportes.",
    };
  }
}
