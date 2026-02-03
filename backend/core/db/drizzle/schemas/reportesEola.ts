import { pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';
import { usuarios } from './usuarios';
import { relations } from 'drizzle-orm';

export const reportesEola = pgTable('reportes_eola', {
	id: uuid('id').primaryKey().defaultRandom(),
	auditor_id: uuid('auditor_id')
		.notNull()
		.references(() => usuarios.id),
	tipo: text('tipo', { enum: ['EOLA', 'Picking'] }).notNull(),
	unidad_negocio: text('unidad_negocio').notNull(),
	sku: text('sku').notNull(),
	upc: text('upc').notNull(),
	orden_tamano: integer('orden_tamano').notNull(),
	cant_inspeccionada: integer('cant_inspeccionada').notNull(),
	cant_aceptada: integer('cant_aceptada').notNull(),
	comentarios: text('comentarios'),
});

export const reportesEolaRelations = relations(reportesEola, ({ one }) => ({
	auditor: one(usuarios, {
		fields: [reportesEola.auditor_id],
		references: [usuarios.id],
	}),
}));
