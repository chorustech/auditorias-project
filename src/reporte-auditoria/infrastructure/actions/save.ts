'use server';
import { GuardarReporte } from '@/src/reporte-auditoria/application/save-report';
import { ReporteAuditoriaNeon } from '@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon';
import { SearchAreaNeon } from '@/src/reporte-auditoria/infrastructure/adapters/area-find';
import { uploadToR2 } from '@/utils/uploadToR2';
import { revalidatePath } from 'next/cache';

export async function guardarReporteAction(formData: FormData) {
  try {
    const reporteRepo = new ReporteAuditoriaNeon();
    const searchArea = new SearchAreaNeon();
    const guardarReporte = new GuardarReporte(reporteRepo, searchArea);

    // Extraer archivo
    const archivo = formData.get('archivo') as File | null;

    // Extraer el resto del JSON
    const data = JSON.parse(formData.get('data') as string);

    await guardarReporte.execute({
      slug: data.slug,
      data: {
        auditor_id: data.auditor_id,
        area_id: data.area_id,
        semana: Number(data.semana),
        respuestas: data.respuestas,
        comentarios: data.comentarios || null,
      },
      metadata: data.metadata,
      archivo: archivo && archivo.size > 0 ? archivo : undefined,
    });

    revalidatePath(`/areas/${data.slug}`);
    return { success: true, message: 'Reporte guardado correctamente' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error inesperado',
    };
  }
}