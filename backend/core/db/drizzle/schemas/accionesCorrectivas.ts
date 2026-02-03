import {
	pgTable,
	uuid,
	integer,
	text,
	decimal,
	varchar,
} from 'drizzle-orm/pg-core';
import { usuarios } from './usuarios';
import { areas } from './areas';
import { relations } from 'drizzle-orm';

export const accionesCorrectivas = pgTable('acciones_correctivas', {
	id: uuid('id').primaryKey().defaultRandom(),
	iniciador_id: uuid('iniciador_id')
		.notNull()
		.references(() => usuarios.id),
	responsable_id: uuid('responsable_id')
		.notNull()
		.references(() => usuarios.id),
	area_id: integer('area_id')
		.notNull()
		.references(() => areas.id),
	numero_parte: text('numero_parte').notNull(),
	ponderancia: varchar('ponderancia', {
		enum: ['LOW', 'MEDIUM', 'HIGH'],
		length: 6,
	}).notNull(),
	porcentaje_falla: decimal('porcentaje_falla', {
		precision: 5,
		scale: 2,
	}).notNull(),
	descripcion_problema: text('descripcion_problema').notNull(),
	feedback_superior: text('feedback_superior'),
	plan_accion_path: text('plan_accion_path'),
	estado: varchar('estado', {
		enum: ['PENDIENTE', 'VALIDADO'],
		length: 9,
	})
		.notNull()
		.default('PENDIENTE'),
});

export const accionesCorrectivasRelations = relations(
	accionesCorrectivas,
	({ one }) => ({
		iniciador: one(usuarios, {
			fields: [accionesCorrectivas.iniciador_id],
			references: [usuarios.id],
			relationName: 'iniciador',
		}),
		responsable: one(usuarios, {
			fields: [accionesCorrectivas.responsable_id],
			references: [usuarios.id],
			relationName: 'responsable',
		}),
		area: one(areas, {
			fields: [accionesCorrectivas.area_id],
			references: [areas.id],
		}),
	})
);
