import { ReporteAuditoria } from "../domain";
import { Metadata } from "../domain/entities";
import { SaveReportDto } from "../domain/ports/dtos/save-report.dto";
import { ReporteAuditoriaRepositorio } from "../domain/repository";

export class UpdateReporte<M extends Metadata> {
  constructor(private readonly reportesRepo: ReporteAuditoriaRepositorio<M>) {}

  async execute(id: number, { data, metadata }: Omit<SaveReportDto<M>, 'slug'>) {
    // 1. Crear la entidad de dominio
    // Nota: El auditor_id no se puede actualizar aquí, se asume que es el mismo.
    const reporte = ReporteAuditoria.create(
      data.area_id,
      data.auditor_id,
      data.semana,
      data.respuestas,
      metadata,
      data.comentarios
    );

    // 2. Persistir los cambios
    await this.reportesRepo.update(id, reporte);
  }
}
