// backend/core/checklists/domain/entities/Checklist.ts

import { Pregunta, PreguntaPrimitive } from './Pregunta';

export type CategoriaChecklist = {
	nombre: string;
	preguntas: Pregunta[];
};

export type ChecklistPrimitive = {
	id: number;
	areaId: number; // Vincula el checklist a un área específica
	categorias: {
		nombre: string;
		preguntas: PreguntaPrimitive[];
	}[];
};

export class Checklist {
	private readonly _id: number;
	private readonly _areaId: number;
	private readonly _categorias: CategoriaChecklist[];

	private constructor(props: {
		id: number;
		areaId: number;
		categorias: CategoriaChecklist[];
	}) {
		this._id = props.id;
		this._areaId = props.areaId;
		this._categorias = props.categorias;
	}

	public static fromPrimitives(props: ChecklistPrimitive): Checklist {
		const categorias = props.categorias.map(cat => ({
			nombre: cat.nombre,
			preguntas: cat.preguntas.map(p => Pregunta.fromPrimitives(p)),
		}));

		if (categorias.length === 0) {
			throw new Error('Un checklist debe tener al menos una categoría.');
		}

		return new Checklist({ ...props, categorias });
	}

	get id(): number {
		return this._id;
	}
	get areaId(): number {
		return this._areaId;
	}
	get categorias(): CategoriaChecklist[] {
		return this._categorias;
	}

	/**
	 * Valida si un conjunto de respuestas es compatible con este checklist.
	 * (Esto sería usado por un servicio de dominio)
	 */
	public esCompatibleConRespuestas(
		respuestas: { pregunta: string; respuesta: boolean }[]
	): boolean {
		const totalPreguntasChecklist = this._categorias.reduce(
			(acc, cat) => acc + cat.preguntas.length,
			0
		);

		if (respuestas.length !== totalPreguntasChecklist) {
			return false; // El número de respuestas no coincide
		}

		const textosPreguntasChecklist = new Set(
			this._categorias.flatMap(cat => cat.preguntas.map(p => p.texto))
		);

		// Verifica que todas las respuestas correspondan a preguntas del checklist
		for (const respuesta of respuestas) {
			if (!textosPreguntasChecklist.has(respuesta.pregunta)) {
				return false;
			}
		}

		return true;
	}

	public toPrimitives(): ChecklistPrimitive {
		return {
			id: this._id,
			areaId: this._areaId,
			categorias: this._categorias.map(cat => ({
				nombre: cat.nombre,
				preguntas: cat.preguntas.map(p => p.toPrimitives()),
			})),
		};
	}
}
