// backend/core/areas/domain/entities/Area.ts

export type AreaPrimitive = {
	id: number;
	nombre: string;
	encargadoEmail: string;
};

export class Area {
	private readonly _id: number;
	private readonly _nombre: string;
	private readonly _encargadoEmail: string;

	private constructor(props: AreaPrimitive) {
		this._id = props.id;
		this._nombre = props.nombre;
		this._encargadoEmail = props.encargadoEmail;
	}

	public static fromPrimitives(props: AreaPrimitive): Area {
		// Aquí podrían ir validaciones, ej: que el email sea válido.
		return new Area(props);
	}

	get id(): number {
		return this._id;
	}

	get nombre(): string {
		return this._nombre;
	}

	get encargadoEmail(): string {
		return this._encargadoEmail;
	}

	public toPrimitives(): AreaPrimitive {
		return {
			id: this._id,
			nombre: this._nombre,
			encargadoEmail: this._encargadoEmail,
		};
	}
}
