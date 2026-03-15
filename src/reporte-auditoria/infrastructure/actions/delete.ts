'use server';

import { DeleteReporte } from '@/src/reporte-auditoria/application/delete-report';
import { ReporteAuditoriaNeon } from '@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon';
import { revalidatePath } from 'next/cache';

export async function deleteReporteAction(id: number, slug: string) {
  try {
    const reporteRepo = new ReporteAuditoriaNeon();
    const deleteReporte = new DeleteReporte(reporteRepo);

    await deleteReporte.execute(id);

    revalidatePath(`/areas/${slug}`);

    return {
      ok: true,
      message: 'Reporte eliminado exitosamente',
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
