import { ReporteAuditoriaRepositorio } from "@/src/reporte-auditoria/domain/repository";
import {
  ReporteAuditoria,
  ReporteAuditoriaConDetalles,
  ReporteAuditoriaPrimitivo,
} from "../../domain";
import { db } from "@/db";
import { ReporteAuditoriaTable } from "@/db/schemas/reporte-auditoria";
import {
  and,
  AnyColumn,
  asc,
  count,
  desc,
  eq,
  gt,
  gte,
  lt,
  lte,
  ne,
} from "drizzle-orm";
import { Metadata } from "../../domain/entities";
import { AreaTable } from "@/db/schemas/area";
import { UsuarioTable } from "@/db/schemas/usuario";
import { IQuery } from "@/src/shared/domain/Entities/Query";

export class ReporteAuditoriaNeon<
  M extends Metadata,
> implements ReporteAuditoriaRepositorio<M> {
  constructor(private readonly _db = db) {}

  async getAll(
    area: number,
    query: IQuery<ReporteAuditoriaConDetalles<Metadata>>,
  ): Promise<ReporteAuditoriaConDetalles<Metadata>[]> {
    // Mapeo de campos string → columnas Drizzle
    const columnMap: Record<string, AnyColumn> = {
      id: ReporteAuditoriaTable.id,
      area_id: ReporteAuditoriaTable.area_id,
      auditor_id: ReporteAuditoriaTable.auditor_id,
      timestamp: ReporteAuditoriaTable.timestamp,
      semana: ReporteAuditoriaTable.semana,
      auditor: UsuarioTable.nombre,
      tipo_auditoria: AreaTable.slug,
    };

    // Traducir filters a condiciones Drizzle
    const filterConditions = query.filters.map(({ field, operator, value }) => {
      const col = columnMap[field as string];
      switch (operator) {
        case "=":
          return eq(col, value);
        case "!=":
          return ne(col, value);
        case "<":
          return lt(col, value);
        case "<=":
          return lte(col, value);
        case ">":
          return gt(col, value);
        case ">=":
          return gte(col, value);
      }
    });

    const orderCol = columnMap[query.orderBy as string];
    const orderFn = query.order === "asc" ? asc(orderCol) : desc(orderCol);
    const offset = query.page * query.perPage;

    return await this._db
      .select({
        id: ReporteAuditoriaTable.id,
        area_id: ReporteAuditoriaTable.area_id,
        auditor_id: ReporteAuditoriaTable.auditor_id,
        timestamp: ReporteAuditoriaTable.timestamp,
        semana: ReporteAuditoriaTable.semana,
        respuestas: ReporteAuditoriaTable.respuestas,
        comentarios: ReporteAuditoriaTable.comentarios,
        es_negativo: ReporteAuditoriaTable.es_negativo,
        metadata: ReporteAuditoriaTable.metadata,

        auditor: UsuarioTable.nombre,
        tipo_auditoria: AreaTable.slug,
        type: AreaTable.slug as any,
      })
      .from(ReporteAuditoriaTable)
      .innerJoin(AreaTable, eq(ReporteAuditoriaTable.area_id, AreaTable.id))
      .innerJoin(
        UsuarioTable,
        eq(ReporteAuditoriaTable.auditor_id, UsuarioTable.id),
      )
      .where(and(eq(ReporteAuditoriaTable.area_id, area), ...filterConditions))
      .orderBy(orderFn)
      .limit(query.perPage)
      .offset(offset);
  }

  async count(
    area: number,
    query: IQuery<ReporteAuditoriaConDetalles<Metadata>>,
  ): Promise<number> {
    const columnMap: Record<string, AnyColumn> = {
      id: ReporteAuditoriaTable.id,
      area_id: ReporteAuditoriaTable.area_id,
      auditor_id: ReporteAuditoriaTable.auditor_id,
      timestamp: ReporteAuditoriaTable.timestamp,
      semana: ReporteAuditoriaTable.semana,
      auditor: UsuarioTable.nombre,
      tipo_auditoria: AreaTable.slug,
    };

    const filterConditions = query.filters.map(({ field, operator, value }) => {
      const col = columnMap[field as string];
      switch (operator) {
        case "=":
          return eq(col, value);
        case "!=":
          return ne(col, value);
        case "<":
          return lt(col, value);
        case "<=":
          return lte(col, value);
        case ">":
          return gt(col, value);
        case ">=":
          return gte(col, value);
      }
    });

    const result = await this._db
      .select({ count: count() }) // count() de drizzle-orm
      .from(ReporteAuditoriaTable)
      .innerJoin(AreaTable, eq(ReporteAuditoriaTable.area_id, AreaTable.id))
      .innerJoin(
        UsuarioTable,
        eq(ReporteAuditoriaTable.auditor_id, UsuarioTable.id),
      )
      .where(and(eq(ReporteAuditoriaTable.area_id, area), ...filterConditions));

    return result[0]?.count ?? 0;
  }

  async save(reporte: ReporteAuditoria<M>): Promise<void> {
    const primitivo = reporte.toPrimitive();
    console.log("Guardando reporte con metadata:", primitivo.metadata);

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
        auditor_id: primitivo.auditor_id,
        area_id: primitivo.area_id,
      })
      .where(eq(ReporteAuditoriaTable.id, id));
  }

  async delete(id: number): Promise<void> {
    await this._db
      .delete(ReporteAuditoriaTable)
      .where(eq(ReporteAuditoriaTable.id, id));
  }

  async getById(
    id: number,
  ): Promise<ReporteAuditoriaConDetalles<Metadata> | null> {
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
        type: AreaTable.slug as any,
      })
      .from(ReporteAuditoriaTable)
      .innerJoin(AreaTable, eq(ReporteAuditoriaTable.area_id, AreaTable.id))
      .innerJoin(
        UsuarioTable,
        eq(ReporteAuditoriaTable.auditor_id, UsuarioTable.id),
      )
      .where(eq(ReporteAuditoriaTable.id, id));

    return reporte[0] || null;
  }
}
