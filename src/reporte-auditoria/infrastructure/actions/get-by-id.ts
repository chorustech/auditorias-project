'use server';

import { ReporteAuditoriaNeon } from '@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon';

export async function getReporteByIdAction(id: number) {
  try {
    const reporteRepo = new ReporteAuditoriaNeon();
    const reporte = await reporteRepo.getById(id);

    if (!reporte) {
      return {
        ok: false,
        message: 'Reporte no encontrado',
        data: null,
      };
    }

    return {
      ok: true,
      message: 'Reporte encontrado',
      data: reporte,
    };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'Ocurrió un error inesperado';
    return {
      ok: false,
      message: errorMessage,
      data: null,
    };
  }
}
