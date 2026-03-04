import { ReporteAuditoria, ReporteAuditoriaPrimitivo } from ".";
import { Metadata } from "./entities";

export interface ReporteAuditoriaRepositorio<M extends Metadata> {
  getAll(area: number): Promise<ReporteAuditoriaPrimitivo<Metadata>[]>;
  save(reporte: ReporteAuditoria<M>): Promise<void>;
  // update(reporte: ReporteAuditoria): Promise<void>
}
