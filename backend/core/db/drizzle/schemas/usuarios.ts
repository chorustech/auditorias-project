import { pgTable, uuid, text, varchar } from 'drizzle-orm/pg-core';

export const usuarios = pgTable('usuarios', {
	id: uuid('id').primaryKey().defaultRandom(),
	nombre: text('nombre').notNull(),
	correo: text('correo').notNull().unique(),
	rol: varchar('rol', {
		enum: ['ADMIN', 'CALIDAD', 'GENERAL', 'AUDITOR'],
		length: 8,
	})
		.notNull()
		.default('GENERAL'),
	microsoft_id: text('microsoft_id').notNull().unique(),
});
