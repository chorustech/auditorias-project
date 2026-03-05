import { NextRequest, NextResponse } from "next/server";
import { ReporteAuditoriaNeon } from "@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon";
import { obtenerReportes } from "@/src/reporte-auditoria/application/get-all-reportes";
import { UpdateReporte } from "@/src/reporte-auditoria/application/update-report";
import { SaveReportDto } from "@/src/reporte-auditoria/domain/ports/dtos/save-report.dto";
import { SearchAreaNeon } from "@/src/reporte-auditoria/infrastructure/adapters/area-find";
import { DeleteReporte } from "@/src/reporte-auditoria/application/delete-report";

// GET /api/reportes/[param]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ param: string }> },
) {
  const { param } = await params;
  const isNumeric = !isNaN(Number(param));

  try {
    const reporteRepo = new ReporteAuditoriaNeon();

    if (isNumeric) {
      // Obtener un solo reporte por ID
      const reporte = await reporteRepo.getById(Number(param));
      if (!reporte) {
        return NextResponse.json(
          { error: "Reporte no encontrado" },
          { status: 404 },
        );
      }
      return NextResponse.json(reporte);
    } else {
      // Obtener todos los reportes por slug de área
      const areasRepo = new SearchAreaNeon();
      const reportes = new obtenerReportes(reporteRepo, areasRepo);
      const data = await reportes.execute(param);
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PUT /api/reportes/[param]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ param: string }> },
) {
  try {
    const { param: id } = await params;
    const body: Omit<SaveReportDto<any>, "slug"> = await request.json();

    const reporteRepo = new ReporteAuditoriaNeon();
    const updateReporte = new UpdateReporte(reporteRepo);

    await updateReporte.execute(Number(id), body);

    return NextResponse.json({
      ok: true,
      message: "Reporte actualizado exitosamente",
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

// DELETE /api/reportes/[param]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ param: string }> },
) {
  try {
    const { param: id } = await params;

    const reporteRepo = new ReporteAuditoriaNeon();
    const deleteReporte = new DeleteReporte(reporteRepo);

    await deleteReporte.execute(Number(id));

    return NextResponse.json({
      ok: true,
      message: "Reporte eliminado exitosamente",
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
