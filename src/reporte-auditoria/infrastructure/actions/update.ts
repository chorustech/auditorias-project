"use server";
import { UpdateReporte } from "@/src/reporte-auditoria/application/update-report";
import { ReporteAuditoriaNeon } from "@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon";
import { revalidatePath } from "next/cache";

export async function updateReporteAction(id: number, formData: FormData) {
  try {
    const reporteRepo = new ReporteAuditoriaNeon();
    const updateReporte = new UpdateReporte(reporteRepo);

    const archivo = formData.get("archivo") as File | null;
    const data = JSON.parse(formData.get("data") as string);

    await updateReporte.execute(id, {
      data: {
        auditor_id: data.auditor_id,
        area_id: data.area_id,
        respuestas: data.respuestas,
        semana: Number(data.semana),
        comentarios: data.comentarios || null,
      },
      metadata: data.metadata,
      archivo: archivo && archivo.size > 0 ? archivo : undefined,
    });

    revalidatePath(`/areas/${data.slug}`);
    return { ok: true, message: "Reporte actualizado exitosamente" };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
}