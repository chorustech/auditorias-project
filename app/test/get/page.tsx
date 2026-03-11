import { obtenerReportes } from "@/src/reporte-auditoria/application/get-all-reportes";
import { SearchAreaNeon } from "@/src/reporte-auditoria/infrastructure/adapters/area-find";
import { ReporteAuditoriaNeon } from "@/src/reporte-auditoria/infrastructure/adapters/repositorio-neon";
import { POINTER_AREAS } from "@/src/shared/domain/Entities/Questions";

export const dynamic = "force-dynamic";

function getRandomItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export default async function Page() {
  const randomArea = getRandomItem(POINTER_AREAS);

  const useCase = new obtenerReportes(
    new ReporteAuditoriaNeon(),
    new SearchAreaNeon()
  );

  let reportes = [];

  try {
    reportes = await useCase.execute(randomArea);
    console.log("Reportes encontrados:", reportes.length);
  } catch (error) {
    console.error("Error:", error);
  }

  return (
    <div>
      <h1>Test GetAll</h1>
      <p>Área: {randomArea}</p>
      <p>Total reportes: {reportes.length}</p>

      <pre>{JSON.stringify(reportes, null, 2)}</pre>
    </div>
  );
}