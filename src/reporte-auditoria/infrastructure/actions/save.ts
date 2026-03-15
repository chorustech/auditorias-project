'use server';

import { GuardarReporte } from '@/src/reporte-auditoria/application/save-report';
import { ReporteAuditoriaNeon } from '@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon';
import { SearchAreaNeon } from '@/src/reporte-auditoria/infrastructure/adapters/area-find';
import { revalidatePath } from 'next/cache';

interface SaveReportFormData {
  slug: string;
  auditor_id: number;
  semana: string;
  respuestas: any;
  comentarios?: string;
  metadata: any;
}

export async function guardarReporteAction(
  formData: SaveReportFormData
) {
  try {
    const reporteRepo = new ReporteAuditoriaNeon();
    const searchArea = new SearchAreaNeon();

    const guardarReporte = new GuardarReporte(
      reporteRepo,
      searchArea
    );

    await guardarReporte.execute({
      slug: formData.slug,
      data: {
        auditor_id: formData.auditor_id,
        semana: Number(formData.semana),
        respuestas: formData.respuestas,
        comentarios: formData.comentarios || null,
      },
      metadata: formData.metadata,
    });

    // Opcional: revalidar página
    revalidatePath(`/areas/${formData.slug}`);

    return {
      success: true,
      message: 'Reporte guardado correctamente',
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Error inesperado',
    };
  }
}