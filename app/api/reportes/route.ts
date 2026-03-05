import { GuardarReporte } from "@/src/reporte-auditoria/application/save-report";
import { ReporteAuditoriaNeon } from "@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon";
import { SearchAreaNeon } from "@/src/reporte-auditoria/infrastructure/adapters/area-find";
import { NextRequest, NextResponse } from "next/server";
import { SaveReportDto } from "@/src/reporte-auditoria/domain/ports/dtos/save-report.dto";

export async function POST(request: NextRequest) {
  try {
    const body: SaveReportDto<any> = await request.json();

    const reporteRepo = new ReporteAuditoriaNeon();
    const areasRepo = new SearchAreaNeon();

    const guardarReporte = new GuardarReporte(reporteRepo, areasRepo);

    await guardarReporte.execute(body);

    return NextResponse.json({
      ok: true,
      message: "Reporte guardado exitosamente",
    });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json(
      { ok: false, message: errorMessage },
      { status: 500 },
    );
  }
}
