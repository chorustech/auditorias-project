// backend/modules/reporte-auditoria/infrastructure/drizzle/DrizzleReporteAuditoriaRepository.ts

import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "../../../../core/db/drizzle"; // Importa todos los esquemas de Drizzle
import { eq } from "drizzle-orm";

import { ReporteAuditoriaRepository } from "../../domain/ports/ReporteAuditoriaRepository";
import {
  ReporteAuditoria,
  RespuestaItem,
} from "../../domain/entities/ReporteAuditoria";

/**
 * Adaptador de Infraestructura para el Repositorio de Reportes de Auditoría usando Drizzle.
 * Implementa la interfaz definida en el dominio.
 */
export class DrizzleReporteAuditoriaRepository implements ReporteAuditoriaRepository {
  // Recibe la instancia de la conexión a la base de datos de Drizzle.
  constructor(private readonly db: NeonHttpDatabase<typeof schema>) {}

  /**
   * Mapea desde el formato de la base de datos (esquema Drizzle) a la entidad de dominio.
   */
  private toDomain(
    raw: typeof schema.reportesAuditoria.$inferSelect,
  ): ReporteAuditoria {
    return ReporteAuditoria.fromPrimitives({
      id: raw.id,
      areaId: raw.area_id,
      auditorId: raw.auditor_id,
      fecha: raw.fecha,
      semana: raw.semana,
      lineaOubicacion: raw.linea_o_ubicacion,
      coordinadorOpicker: raw.coordinador_o_picker,
      respuestas: raw.respuestas as RespuestaItem[], // Drizzle puede no inferir el tipo exacto de JSONB
      comentarios: raw.comentarios ?? undefined,
      esNegativo: raw.es_negativo,
    });
  }

  /**
   * Mapea desde la entidad de dominio al formato de la base de datos (esquema Drizzle).
   */
  private toPersistence(reporte: ReporteAuditoria) {
    const primitive = reporte.toPrimitives();
    return {
      id: primitive.id,
      area_id: primitive.areaId,
      auditor_id: primitive.auditorId,
      fecha: primitive.fecha,
      semana: primitive.semana,
      linea_o_ubicacion: primitive.lineaOubicacion,
      coordinador_o_picker: primitive.coordinadorOpicker,
      respuestas: primitive.respuestas,
      comentarios: primitive.comentarios,
      es_negativo: primitive.esNegativo,
    };
  }

  /**
   * Busca un reporte por su ID.
   */
  public async findById(id: string): Promise<ReporteAuditoria | null> {
    const result = await this.db.query.reportesAuditoria.findFirst({
      where: eq(schema.reportesAuditoria.id, id),
    });

    if (!result) {
      return null;
    }

    return this.toDomain(result);
  }

  /**
   * Busca todos los reportes.
   */
  public async findAll(): Promise<ReporteAuditoria[]> {
    const results = await this.db.query.reportesAuditoria.findMany();
    return results.map(this.toDomain);
  }

  /**
   * Guarda (inserta) un nuevo reporte.
   */
  public async save(reporte: ReporteAuditoria): Promise<void> {
    const persistenceData = this.toPersistence(reporte);
    await this.db.insert(schema.reportesAuditoria).values(persistenceData);
  }
}
