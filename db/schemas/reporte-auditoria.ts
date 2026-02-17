import {
  boolean,
  date,
  integer,
  json,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";
import { AreaTable } from "./area";
import { UsuarioTable } from "./usuario";

export const ReporteAuditoriaTable = pgTable("reporte_auditoria", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  area_id: integer()
    .references(() => AreaTable.id)
    .notNull(),
  auditor_id: integer()
    .references(() => UsuarioTable.id)
    .notNull(),
  timestamp: date({ mode: "date" }).defaultNow(),
  semana: integer().notNull(),
  linea_o_ubicacion: varchar().notNull(),
  coordinador_o_picker: varchar().notNull(),
  respuestas: json().notNull(),
  comentarios: varchar(),
  es_negativo: boolean().notNull(),
});
