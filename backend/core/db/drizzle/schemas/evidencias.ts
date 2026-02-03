import { pgTable, uuid, text, varchar } from 'drizzle-orm/pg-core';
import { reportesAuditoria } from './reportesAuditoria';
import { accionesCorrectivas } from './accionesCorrectivas';
import { relations } from 'drizzle-orm';

export const evidencias = pgTable('evidencias', {
	id: uuid('id').primaryKey().defaultRandom(),
	referencia_id: uuid('referencia_id').notNull(),
	tipo_referencia: varchar('tipo_referencia', {
		enum: ['AUDITORIA', 'RAC'],
		length: 9,
	}).notNull(),
	url_archivo: text('url_archivo').notNull(),
});

// Note: Drizzle ORM does not directly support polymorphic relationships
// with foreign key constraints in the same way as some other ORMs.
// The relationship between 'evidencias' and the other tables ('reportes_auditoria', 'acciones_correctivas')
// is maintained at the application level via 'referencia_id' and 'tipo_referencia'.

// If you wanted to enforce this at the DB level, you would typically have separate nullable
// foreign key columns (e.g., 'reporte_auditoria_id' and 'accion_correctiva_id').
