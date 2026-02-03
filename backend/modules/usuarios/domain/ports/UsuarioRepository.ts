// backend/modules/usuarios/domain/ports/UsuarioRepository.ts
import { Usuario } from '../entities/Usuario';

/**
 * Puerto de Salida (Driven Port) para la persistencia de Usuarios.
 */
export interface UsuarioRepository {
	/**
	 * Busca un usuario por su ID.
	 * @param id El UUID del usuario a buscar.
	 * @returns La entidad de dominio si se encuentra, o null si no.
	 */
	findById(id: string): Promise<Usuario | null>;

	/**
	 * Busca un usuario por su email.
	 * @param email El email del usuario a buscar.
	 * @returns La entidad de dominio si se encuentra, o null si no.
	 */
	findByEmail(email: string): Promise<Usuario | null>;

	/**
	 * Busca todos los usuarios.
	 * @returns Un array con todas las entidades de dominio.
	 */
	findAll(): Promise<Usuario[]>;

	/**
	 * Guarda un nuevo usuario.
	 * @param usuario La entidad de dominio a persistir.
	 */
	save(usuario: Usuario): Promise<void>;
}
