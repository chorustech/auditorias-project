import { ReporteAuditoria } from "../domain";
import { Metadata } from "../domain/entities";
import { SaveReportDto } from "../domain/ports/dtos/save-report.dto";
import { SearchArea } from "../domain/repositorios/areas";
import { ReporteAuditoriaRepositorio } from "../domain/repository";

export class GuardarReporte<M extends Metadata> {
  constructor(
    private readonly reportesRepo: ReporteAuditoriaRepositorio<M>,
    private readonly searchArea: SearchArea,
  ) {}

async execute({ slug, data, metadata }: SaveReportDto<M>) {
  // 1. Validar que el área existe
  const areaId = await this.searchArea.search(slug);
  if (areaId == 0)
    throw new Error(`El Area no fue encontrada con el slug: ${slug}`);

  // 2. Crear la entidad de dominio
  const reporte = ReporteAuditoria.create(
    areaId,        
    data.auditor_id,
    data.semana,
    data.respuestas,
    metadata,
    data.comentarios,
  );

  // 3. Persistir
  await this.reportesRepo.save(reporte);
}
}
