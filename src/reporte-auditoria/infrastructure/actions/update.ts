'use server';

import { UpdateReporte } from '@/src/reporte-auditoria/application/update-report';
import { SaveReportDto } from '@/src/reporte-auditoria/domain/ports/dtos/save-report.dto';
import { ReporteAuditoriaNeon } from '@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon';
import { revalidatePath } from 'next/cache';
import { Metadata } from '@/src/reporte-auditoria/domain/entities';

export async function updateReporteAction(
  id: number,
  body: Omit<SaveReportDto<Metadata>, 'slug'>,
  slug: string
) {
  try {
    const reporteRepo = new ReporteAuditoriaNeon();
    const updateReporte = new UpdateReporte(reporteRepo);

    await updateReporte.execute(id, body);

    revalidatePath(`/areas/${slug}`);

    return {
      ok: true,
      message: 'Reporte actualizado exitosamente',
    };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'Ocurrió un error inesperado';
    return {
      ok: false,
      message: errorMessage,
    };
  }
}
