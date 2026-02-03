// backend/core/usuarios/domain/entities/Usuario.ts

export type RolUsuario = 'ADMIN' | 'CALIDAD' | 'GENERAL' | 'AUDITOR';

export type UsuarioPrimitive = {
	id: string; // uuid
	nombre: string;
	correo: string;
	rol: RolUsuario;
	microsoftId: string;
};

export class Usuario {
	private readonly _id: string;
	private readonly _nombre: string;
	private readonly _correo: string;
	private readonly _rol: RolUsuario;
	private readonly _microsoftId: string;

	private constructor(props: UsuarioPrimitive) {
		this._id = props.id;
		this._nombre = props.nombre;
		this._correo = props.correo;
		this._rol = props.rol;
		this._microsoftId = props.microsoftId;
	}

	public static fromPrimitives(props: UsuarioPrimitive): Usuario {
		// Validaciones podrían ir aquí (ej. formato de correo)
		return new Usuario(props);
	}

	get id(): string {
		return this._id;
	}
	get nombre(): string {
		return this._nombre;
	}
	get correo(): string {
		return this._correo;
	}
	get rol(): RolUsuario {
		return this._rol;
	}

	public esAdmin(): boolean {
		return this._rol === 'ADMIN';
	}

	public puedeAuditar(): boolean {
		return this._rol === 'ADMIN' | 'CALIDAD' || this._rol === 'AUDITOR';
	}

	public toPrimitives(): UsuarioPrimitive {
		return {
			id: this._id,
			nombre: this._nombre,
			correo: this._correo,
			rol: this._rol,
			microsoftId: this._microsoftId,
		};
	}
}
