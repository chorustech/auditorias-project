import { ReporteAuditoria, ReporteAuditoriaPrimitivo } from ".";

export interface ReporteAuditoriaRepositorio {
  getAll(area: number): Promise<ReporteAuditoriaPrimitivo[]>;
  save(reporte: ReporteAuditoria): Promise<void>;
}
