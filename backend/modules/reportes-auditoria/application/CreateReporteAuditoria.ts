// backend/modules/reportes-auditoria/application/CreateReporteAuditoria.ts
import {
	ReporteAuditoria,
	ReporteAuditoriaPrimitive,
	RespuestaItem,
} from '../domain/entities/ReporteAuditoria';
import { ReporteAuditoriaRepository } from '../domain/ports/ReporteAuditoriaRepository';
import { UsuarioRepository } from '../../usuarios/domain/ports/UsuarioRepository';
import { ChecklistRepository } from '../../checklists/domain/ports/ChecklistRepository';

// DTO (Data Transfer Object) para la entrada del caso de uso.
// Contiene los datos crudos necesarios para crear un reporte.
export type CreateReporteAuditoriaDTO = {
	id: string; // El UUID se genera en la capa de infraestructura (ej. controller) y se pasa al caso de uso.
	areaId: number;
	auditorId: string;
	fecha: Date;
	semana: number;
	lineaOubicacion: string;
	coordinadorOpicker: string;
	respuestas: RespuestaItem[];
	comentarios?: string;
};

/**
 * Caso de Uso: Crear un nuevo Reporte de Auditoría.
 * Orquesta las entidades y repositorios para ejecutar la lógica de negocio.
 */
export class CreateReporteAuditoria {
	private readonly reporteAuditoriaRepo: ReporteAuditoriaRepository;
	private readonly usuarioRepo: UsuarioRepository;
	private readonly checklistRepo: ChecklistRepository;

	// Inyectamos las dependencias (repositorios) en el constructor.
	// Dependemos de abstracciones (interfaces), no de implementaciones.
	constructor(
		reporteAuditoriaRepo: ReporteAuditoriaRepository,
		usuarioRepo: UsuarioRepository,
		checklistRepo: ChecklistRepository
	) {
		this.reporteAuditoriaRepo = reporteAuditoriaRepo;
		this.usuarioRepo = usuarioRepo;
		this.checklistRepo = checklistRepo;
	}

	/**
	 * Ejecuta el caso de uso.
	 * @param dto Los datos para crear el reporte.
	 * @returns El reporte de auditoría creado, en su forma primitiva.
	 */
	public async run(
		dto: CreateReporteAuditoriaDTO
	): Promise<ReporteAuditoriaPrimitive> {
		// 1. Validar que el auditor existe y tiene permisos.
		const auditor = await this.usuarioRepo.findById(dto.auditorId);
		if (!auditor) {
			throw new Error('El auditor especificado no existe.');
		}
		if (!auditor.puedeAuditar()) {
			throw new Error('El usuario no tiene permisos para realizar auditorías.');
		}

		// 2. Obtener el checklist correspondiente al área.
		const checklist = await this.checklistRepo.findByAreaId(dto.areaId);
		if (!checklist) {
			throw new Error(
				'No se encontró un checklist de preguntas para el área especificada.'
			);
		}

		// 3. Validar que las respuestas enviadas son compatibles con el checklist.
		if (!checklist.esCompatibleConRespuestas(dto.respuestas)) {
			throw new Error(
				'Las respuestas proporcionadas no coinciden con las preguntas del checklist del área.'
			);
		}

		// 4. Usar el factory method de la entidad para crear el objeto de dominio.
		// Esto asegura que todas las invariantes y lógica de negocio (ej. calcular esNegativo) se apliquen.
		const reporte = ReporteAuditoria.create(dto);

		// 5. Persistir la nueva entidad a través de su repositorio.
		await this.reporteAuditoriaRepo.save(reporte);

		// 6. Devolver el estado primitivo de la entidad creada.
		return reporte.toPrimitives();
	}
}
