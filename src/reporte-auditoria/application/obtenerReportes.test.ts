import { describe, it, expect, beforeEach } from "vitest";
import { obtenerReportes } from "./obtenerReportes"; // Ajusta la ruta
import { ReporteAuditoriaNeon } from "../infrastructure/adapters/repositorio-neon";
import { SearchAreaNeon } from "../infrastructure/adapters/area-find";
import { db } from "@/db";
import { AreaTable } from "@/db/schemas/area";
import { ReporteAuditoriaTable } from "@/db/schemas/reporte-auditoria";

describe("obtenerReportes Integration Test", () => {
  // 1. Instanciamos los repositorios reales
  const searchAreaRepo = new SearchAreaNeon(db);
  const reportesRepo = new ReporteAuditoriaNeon(db);
  const sut = new obtenerReportes(reportesRepo, searchAreaRepo);

  // Limpieza previa para asegurar un entorno controlado
  beforeEach(async () => {
    await db.delete(ReporteAuditoriaTable);
    await db.delete(AreaTable);
  });

  it("debería recuperar reportes reales desde la base de datos", async () => {
    const slugTest = "baldwin-state";

    const result = await sut.execute(slugTest);

    console.log(result);
  });

  it("debería fallar si el slug no existe en la tabla de áreas", async () => {
    const slugInexistente = "no-existe";

    await expect(sut.execute(slugInexistente)).rejects.toThrow(
      `El Area no fue encontrada con el slug: ${slugInexistente}`,
    );
  });
});
