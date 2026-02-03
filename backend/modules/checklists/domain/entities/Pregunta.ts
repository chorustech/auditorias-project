// backend/core/checklists/domain/entities/Pregunta.ts

export type PreguntaPrimitive = {
	id: number;
	texto: string;
};

export class Pregunta {
	private readonly _id: number;
	private readonly _texto: string;

	private constructor(props: PreguntaPrimitive) {
		this._id = props.id;
		this._texto = props.texto;
	}

	public static fromPrimitives(props: PreguntaPrimitive): Pregunta {
		if (!props.texto || props.texto.trim().length === 0) {
			throw new Error('El texto de la pregunta no puede estar vacío.');
		}
		return new Pregunta(props);
	}

	get id(): number {
		return this._id;
	}

	get texto(): string {
		return this._texto;
	}

	public toPrimitives(): PreguntaPrimitive {
		return {
			id: this._id,
			texto: this._texto,
		};
	}
}
