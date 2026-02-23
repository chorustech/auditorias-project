import { ReporteAuditoriaRepositorio } from "@/src/reporte-auditoria/domain/repository";
import { ReporteAuditoria, ReporteAuditoriaPrimitivo } from "../../domain";
import { db } from "@/db";
import { ReporteAuditoriaTable } from "@/db/schemas/reporte-auditoria";
import { eq } from "drizzle-orm";

export class ReporteAuditoriaNeon implements ReporteAuditoriaRepositorio {
  constructor(private readonly _db = db) {}

  async getAll(area: number): Promise<ReporteAuditoriaPrimitivo[]> {
    const reportes = await this._db
      .select()
      .from(ReporteAuditoriaTable)
      .where(eq(ReporteAuditoriaTable.area_id, area));

    return reportes;
  }

  async save(reporte: ReporteAuditoria): Promise<void> {
    // TODO: Implement
  }
}
