// backend/modules/areas/domain/ports/AreaRepository.ts
import { Area } from '../entities/Area';

/**
 * Puerto de Salida (Driven Port) para la persistencia de Áreas.
 */
export interface AreaRepository {
	/**
	 * Busca un área por su ID.
	 * @param id El ID del área a buscar.
	 * @returns La entidad de dominio si se encuentra, o null si no.
	 */
	findById(id: number): Promise<Area | null>;

	/**
	 * Busca todas las áreas.
	 * @returns Un array con todas las entidades de dominio.
	 */
	findAll(): Promise<Area[]>;

	/**
	 * Guarda una nueva área.
	 * @param area La entidad de dominio a persistir.
	 */
	save(area: Area): Promise<void>;
}
