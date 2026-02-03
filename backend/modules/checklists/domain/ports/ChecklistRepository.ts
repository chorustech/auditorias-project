// backend/modules/checklists/domain/ports/ChecklistRepository.ts
import { Checklist } from '../entities/Checklist';

/**
 * Puerto de Salida (Driven Port) para la persistencia de Checklists.
 */
export interface ChecklistRepository {
	/**
	 * Busca un checklist por su ID.
	 * @param id El ID del checklist a buscar.
	 * @returns La entidad de dominio si se encuentra, o null si no.
	 */
	findById(id: number): Promise<Checklist | null>;

	/**
	 * Busca un checklist por el ID del área a la que pertenece.
	 * @param areaId El ID del área.
	 * @returns La entidad de dominio si se encuentra, o null si no.
	 */
	findByAreaId(areaId: number): Promise<Checklist | null>;

	/**
	 * Guarda un nuevo checklist.
	 * @param checklist La entidad de dominio a persistir.
	 */
	save(checklist: Checklist): Promise<void>;
}
