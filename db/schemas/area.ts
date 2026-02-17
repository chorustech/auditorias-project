import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const AreaTable = pgTable("area", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar().unique().notNull(),
  encargado_email: varchar().unique().notNull(),
});
