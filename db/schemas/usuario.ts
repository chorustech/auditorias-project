import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const ROLES = [
  "administrador",
  "calidad",
  "general",
  "auditor",
] as const;

export type Roles = (typeof ROLES)[number];

export const UsuarioTable = pgTable("usuario", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar().notNull(),
  email: varchar().unique().notNull(),
  rol: text({ enum: ROLES }).notNull().default("auditor"),
});
