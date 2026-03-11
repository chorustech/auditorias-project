import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const ROLES = [
  "administrador",
  "calidad",
  "general",
  "auditor",
] as const;

export type Roles = (typeof ROLES)[number];

export const UsuarioTable = pgTable("usuarios", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  numEmpleado: integer().unique().notNull(),
  nombre: varchar().notNull(),
  email: varchar().unique().notNull(),
  password: text().notNull(),
  rol: text({ enum: ROLES }).notNull().default("auditor"),
  estado: boolean().notNull().default(true),
});
