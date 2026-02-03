import { drizzle } from "drizzle-orm/neon-http";

export * from "./schemas/accionesCorrectivas";
export * from "./schemas/areas";
export * from "./schemas/evidencias";
export * from "./schemas/reportesAuditoria";
export * from "./schemas/reportesEola";
export * from "./schemas/reportesNcr";
export * from "./schemas/usuarios";

export const db = drizzle(process.env.DATABASE_URL!);
