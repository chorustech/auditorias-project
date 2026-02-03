// backend/modules/usuarios/infrastructure/drizzle/DrizzleUsuarioRepository.ts
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from '../../../../core/db/drizzle';
import { eq } from 'drizzle-orm';
import { UsuarioRepository } from '../../domain/ports/UsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';

export class DrizzleUsuarioRepository implements UsuarioRepository {
	constructor(private readonly db: NeonHttpDatabase<typeof schema>) {}

	private toDomain(
		raw: typeof schema.usuarios.$inferSelect
	): Usuario {
		return Usuario.fromPrimitives({
			id: raw.id,
			nombre: raw.nombre,
			correo: raw.correo,
			rol: raw.rol as any,
			microsoftId: raw.microsoft_id,
		});
	}

	public async findById(id: string): Promise<Usuario | null> {
		const result = await this.db.query.usuarios.findFirst({
			where: eq(schema.usuarios.id, id),
		});
		return result ? this.toDomain(result) : null;
	}

	public async findByEmail(email: string): Promise<Usuario | null> {
		const result = await this.db.query.usuarios.findFirst({
			where: eq(schema.usuarios.correo, email),
		});
		return result ? this.toDomain(result) : null;
	}

	public async findAll(): Promise<Usuario[]> {
		const results = await this.db.query.usuarios.findMany();
		return results.map(this.toDomain);
	}

	public async save(usuario: Usuario): Promise<void> {
		// Lógica de save no implementada para este ejemplo
	}
}
