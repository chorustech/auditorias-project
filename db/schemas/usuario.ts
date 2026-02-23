import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const UsuarioTable = pgTable("usuario", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar().notNull(),
  email: varchar().unique().notNull(),
  rol: varchar().notNull().default("hola"),
});
