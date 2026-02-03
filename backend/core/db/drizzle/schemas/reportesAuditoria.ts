import {
	pgTable,
	uuid,
	integer,
	timestamp,
	text,
	jsonb,
	boolean,
} from 'drizzle-orm/pg-core';
import { usuarios } from './usuarios';
import { areas } from './areas';
import { relations } from 'drizzle-orm';

export const reportesAuditoria = pgTable('reportes_auditoria', {
	id: uuid('id').primaryKey().defaultRandom(),
	area_id: integer('area_id')
		.notNull()
		.references(() => areas.id),
	auditor_id: uuid('auditor_id')
		.notNull()
		.references(() => usuarios.id),
	fecha: timestamp('fecha').notNull().defaultNow(),
	semana: integer('semana').notNull(),
	linea_o_ubicacion: text('linea_o_ubicacion').notNull(),
	coordinador_o_picker: text('coordinador_o_picker').notNull(),
	respuestas: jsonb('respuestas').notNull(),
	comentarios: text('comentarios'),
	es_negativo: boolean('es_negativo').notNull().default(false),
});

export const reportesAuditoriaRelations = relations(
	reportesAuditoria,
	({ one }) => ({
		area: one(areas, {
			fields: [reportesAuditoria.area_id],
			references: [areas.id],
		}),
		auditor: one(usuarios, {
			fields: [reportesAuditoria.auditor_id],
			references: [usuarios.id],
		}),
	})
);
