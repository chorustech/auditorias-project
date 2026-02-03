// backend/core/reportes-auditoria/domain/ports/ReporteAuditoriaRepository.ts

import { ReporteAuditoria } from '../entities/ReporteAuditoria';

/**
 * Puerto de Salida (Driven Port) para la persistencia de Reportes de Auditoría.
 *
 * Esta interfaz define los métodos que el dominio necesita para interactuar
 * con la capa de persistencia, sin conocer los detalles de la implementación
 * (ej. Drizzle, Prisma, etc.).
 */
export interface ReporteAuditoriaRepository {
	/**
	 * Guarda un nuevo reporte de auditoría en la base de datos.
	 * @param reporte - La entidad de dominio a persistir.
	 */
	save(reporte: ReporteAuditoria): Promise<void>;

	/**
	 * Busca un reporte de auditoría por su ID.
	 * @param id - El UUID del reporte a buscar.
	 * @returns La entidad de dominio si se encuentra, o null si no.
	 */
	findById(id: string): Promise<ReporteAuditoria | null>;

	/**
	 * Obtiene todos los reportes de auditoría.
	 * @returns Un array con todas las entidades de dominio.
	 */
	findAll(): Promise<ReporteAuditoria[]>;
}
