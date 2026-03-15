import { GuardarReporte } from "@/src/reporte-auditoria/application/save-report";
import { SearchAreaNeon } from "@/src/reporte-auditoria/infrastructure/adapters/area-find";
import { ReporteAuditoriaNeon } from "@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon";
import { POINTER_AREAS } from "@/src/shared/domain/Entities/Questions";

function getRandomItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomBooleanAnswers(length: number): boolean[] {
  return Array.from({ length }, () => Math.random() >= 0.5);
}

export default async function Page() {
  const usuarios = [1, 6, 7, 8, 9];

  const randomUser =
    usuarios[Math.floor(Math.random() * usuarios.length)];

  const randomArea =
    POINTER_AREAS[Math.floor(Math.random() * POINTER_AREAS.length)];

  const respuestas = Array.from({ length: 10 }, () =>
    Math.random() >= 0.5
  );

  const guardarReporte = new GuardarReporte(
    new ReporteAuditoriaNeon(),
    new SearchAreaNeon()
  );

  try {
    await guardarReporte.execute({
      slug: randomArea,
      data: {
        auditor_id: randomUser,
        semana: 1,
        respuestas,
        comentarios: "Auto generado",
      },
      metadata: { test: true },
    });

    console.log("✅ Guardado correctamente");
  } catch (error) {
    console.error("❌ Error guardando:", error);
  }

  return <div>Save Reporte</div>;
}