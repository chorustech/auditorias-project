import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const areas = pgTable('areas', {
	id: serial('id').primaryKey(),
	nombre: text('nombre').notNull(),
	encargado_email: text('encargado_email').notNull(),
});
