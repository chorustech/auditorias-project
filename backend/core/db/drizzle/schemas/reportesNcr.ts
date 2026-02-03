import {
	pgTable,
	uuid,
	varchar,
	date,
	integer,
	text,
} from 'drizzle-orm/pg-core';

export const reportesNcr = pgTable('reportes_ncr', {
	id: uuid('id').primaryKey().defaultRandom(),
	ncr_code: varchar('ncr_code', { length: 255 }).notNull(),
	fecha: date('fecha').notNull(),
	semana: integer('semana').notNull(),
	numero_parte: text('numero_parte').notNull(),
	proveedor: text('proveedor').notNull(),
	defecto: text('defecto').notNull(),
	excel_path: text('excel_path'),
});
