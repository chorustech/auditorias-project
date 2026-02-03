'use server';

import { db } from '@/backend/core/db/drizzle';
import { CreateReporteAuditoria } from '@/backend/modules/reportes-auditoria/application/CreateReporteAuditoria';
import { DrizzleReporteAuditoriaRepository } from '@/backend/modules/reportes-auditoria/infrastructure/drizzle/DrizzleReporteAuditoriaRepository';
import { DrizzleUsuarioRepository } from '@/backend/modules/usuarios/infrastructure/drizzle/DrizzleUsuarioRepository';
import { DrizzleChecklistRepository } from '@/backend/modules/checklists/infrastructure/drizzle/DrizzleChecklistRepository';
import { revalidatePath } from 'next/cache';
import { ZodError, z } from 'zod';
import { randomUUID } from 'crypto';

// Esquema de validación con Zod para los datos de entrada del formulario.
const createReporteSchema = z.object({
	areaId: z.coerce.number().positive(),
	lineaOubicacion: z.string().min(1),
	coordinadorOpicker: z.string().min(1),
	respuestas: z
		.array(
			z.object({
				pregunta: z.string(),
				respuesta: z.boolean(),
			})
		)
		.min(1),
	comentarios: z.string().optional(),
});

// Definimos un tipo para el estado de retorno de la Server Action.
export type CreateReporteState = {
	success: boolean;
	message: string;
	errors?: { field: string; message: string }[];
};

export async function createReporteAuditoriaAction(
	prevState: CreateReporteState,
	formData: FormData
): Promise<CreateReporteState> {
	// --- Inyección de Dependencias ---
	const reporteRepo = new DrizzleReporteAuditoriaRepository(db);
	const usuarioRepo = new DrizzleUsuarioRepository(db);
	const checklistRepo = new DrizzleChecklistRepository(db); // Usando el mock por ahora
	const createReporteUseCase = new CreateReporteAuditoria(
		reporteRepo,
		usuarioRepo,
		checklistRepo
	);

	try {
		// --- Autenticación y Autorización (Simulada) ---
		// En una app real, obtendrías el usuario de la sesión (NextAuth, Clerk, etc.)
		const auditorId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'; // Simulado

		// --- Validación de Entrada ---
		const rawData = Object.fromEntries(formData.entries());
		const parsedData = createReporteSchema.parse({
			...rawData,
			respuestas: JSON.parse(rawData.respuestas as string),
		});

		// --- Ejecución del Caso de Uso ---
		await createReporteUseCase.run({
			...parsedData,
			id: randomUUID(), // Generamos el ID aquí
			auditorId,
			fecha: new Date(),
			semana: 1, // Esto debería calcularse a partir de la fecha
		});

		// --- Éxito ---
		revalidatePath('/dashboard/reports'); // Invalida el caché de la página de reportes
		return {
			success: true,
			message: 'Reporte de auditoría creado exitosamente.',
		};
	} catch (error) {
		// --- Manejo de Errores ---
		if (error instanceof ZodError) {
			return {
				success: false,
				message: 'Error de validación. Por favor, revisa los campos.',
				errors: error.errors.map(e => ({
					field: e.path.join('.'),
					message: e.message,
				})),
			};
		}

		console.error('Error al crear el reporte:', error);
		return {
			success: false,
			message: (error as Error).message, // Mostramos el error del caso de uso
		};
	}
}
