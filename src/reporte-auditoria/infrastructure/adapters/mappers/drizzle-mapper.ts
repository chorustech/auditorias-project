import { ReporteAuditoriaPrimitivo } from "@/src/reporte-auditoria/domain";
import { Metadata } from "@/src/reporte-auditoria/domain/entities";

export class DrizzleMapper {
    constructor(private data: Omit<ReporteAuditoriaPrimitivo<Metadata>, 'respuestas'>) {}
}