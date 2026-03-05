import { ReporteAuditoriaRepositorio } from "@/src/reporte-auditoria/domain/repository";
import { ReporteAuditoria, ReporteAuditoriaConDetalles, ReporteAuditoriaPrimitivo } from "../../domain";
import { db } from "@/db";
import { ReporteAuditoriaTable } from "@/db/schemas/reporte-auditoria";
import { eq } from "drizzle-orm";
import { Metadata } from "../../domain/entities";
import { AreaTable } from "@/db/schemas/area";
import { UsuarioTable } from "@/db/schemas/usuario";

export class ReporteAuditoriaNeon<
  M extends Metadata,
> implements ReporteAuditoriaRepositorio<M> {
  constructor(private readonly _db = db) {}

  async getAll(area: number): Promise<ReporteAuditoriaConDetalles<Metadata>[]> {
    const reportes = await this._db
      .select({
        id: ReporteAuditoriaTable.id,
        area_id: ReporteAuditoriaTable.area_id,
        auditor_id: ReporteAuditoriaTable.auditor_id,
        auditor: UsuarioTable.nombre,
        timestamp: ReporteAuditoriaTable.timestamp,
        semana: ReporteAuditoriaTable.semana,
        respuestas: ReporteAuditoriaTable.respuestas,
        comentarios: ReporteAuditoriaTable.comentarios,
        es_negativo: ReporteAuditoriaTable.es_negativo,
        metadata: ReporteAuditoriaTable.metadata,
        tipo_auditoria: AreaTable.slug,
      })
      .from(ReporteAuditoriaTable)
      .innerJoin(AreaTable, eq(ReporteAuditoriaTable.area_id, AreaTable.id))
      .innerJoin(
        UsuarioTable,
        eq(ReporteAuditoriaTable.auditor_id, UsuarioTable.id),
      )
      .where(eq(ReporteAuditoriaTable.area_id, area));
    return reportes;
  }

  async save(reporte: ReporteAuditoria<M>): Promise<void> {
    const primitivo = reporte.toPrimitive();

    await this._db.insert(ReporteAuditoriaTable).values({
      area_id: primitivo.area_id,
      auditor_id: primitivo.auditor_id,
      semana: primitivo.semana,
      respuestas: primitivo.respuestas,
      comentarios: primitivo.comentarios,
      es_negativo: primitivo.es_negativo,
      metadata: primitivo.metadata,
    });
  }

  async update(id: number, reporte: ReporteAuditoria<M>): Promise<void> {
    const primitivo = reporte.toPrimitive();

    await this._db
      .update(ReporteAuditoriaTable)
      .set({
        semana: primitivo.semana,
        respuestas: primitivo.respuestas,
        comentarios: primitivo.comentarios,
        es_negativo: primitivo.es_negativo,
        metadata: primitivo.metadata,
      })
      .where(eq(ReporteAuditoriaTable.id, id));
  }

  async delete(id: number): Promise<void> {
    await this._db.delete(ReporteAuditoriaTable).where(eq(ReporteAuditoriaTable.id, id));
  }

  async getById(id: number): Promise<ReporteAuditoriaConDetalles<Metadata> | null> {
    const reporte = await this._db
      .select({
        id: ReporteAuditoriaTable.id,
        area_id: ReporteAuditoriaTable.area_id,
        auditor_id: ReporteAuditoriaTable.auditor_id,
        auditor: UsuarioTable.nombre,
        timestamp: ReporteAuditoriaTable.timestamp,
        semana: ReporteAuditoriaTable.semana,
        respuestas: ReporteAuditoriaTable.respuestas,
        comentarios: ReporteAuditoriaTable.comentarios,
        es_negativo: ReporteAuditoriaTable.es_negativo,
        metadata: ReporteAuditoriaTable.metadata,
        tipo_auditoria: AreaTable.slug,
      })
      .from(ReporteAuditoriaTable)
      .innerJoin(AreaTable, eq(ReporteAuditoriaTable.area_id, AreaTable.id))
      .innerJoin(UsuarioTable, eq(ReporteAuditoriaTable.auditor_id, UsuarioTable.id))
      .where(eq(ReporteAuditoriaTable.id, id));

    return reporte[0] || null;
  }
}
