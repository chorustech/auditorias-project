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
import { Metadata } from "@/src/reporte-auditoria/domain/entities";

export const ReporteAuditoriaTable = pgTable("reporte_auditoria", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  area_id: integer()
    .references(() => AreaTable.id)
    .notNull(),
  auditor_id: integer()
    .references(() => UsuarioTable.id)
    .notNull(),
  timestamp: date({ mode: "date" }).defaultNow().notNull(),
  semana: integer().notNull(),
  respuestas: boolean().array().notNull(),
  comentarios: varchar(),
  es_negativo: boolean().notNull(),
  metadata:  json().$type<Metadata>().notNull()
});
