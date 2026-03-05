import { ReporteAuditoria, ReporteAuditoriaPrimitivo } from ".";
import { Metadata } from "./entities";

export interface ReporteAuditoriaRepositorio<M extends Metadata> {
  getAll(area: number): Promise<ReporteAuditoriaPrimitivo<Metadata>[]>;
  getById(id: number): Promise<ReporteAuditoriaPrimitivo<Metadata> | null>;
  save(reporte: ReporteAuditoria<M>): Promise<void>;
  update(id: number, reporte: ReporteAuditoria<M>): Promise<void>;
  delete(id: number): Promise<void>;
}
