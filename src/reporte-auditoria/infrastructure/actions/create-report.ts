"use server";

import { ReporteAuditoria } from "@/src/reporte-auditoria/domain";
import { ReporteAuditoriaNeon } from "../adapters/repositorio-neon";
import { getSessionUser } from "@/src/shared/infrastructure/utils/get-session-user";
import { Metadata } from "@/src/reporte-auditoria/domain/entities";

export async function createReportAction(
  reportData: Omit<ReporteAuditoria<Metadata>, "id" | "timestamp" | "auditor_id">,
) {
  const user = await getSessionUser();

  if (!user || (user.rol !== "auditor" && user.rol !== "administrador")) {
    return {
      ok: false,
      message: "No tienes permisos para realizar esta acción.",
    };
  }

  try {
    const repo = new ReporteAuditoriaNeon();
    const newReport = ReporteAuditoria.create(
      reportData.area_id,
      user.id,
      reportData.semana,
      reportData.respuestas,
      reportData.metadata,
      reportData.comentarios,
      null,
    );
    await repo.save(newReport);

    return {
      ok: true,
      message: "Reporte creado exitosamente.",
    };
  } catch (error) {
    console.error("Error creating report:", error);
    return {
      ok: false,
      message: "Ocurrió un error al crear el reporte.",
    };
  }
}
