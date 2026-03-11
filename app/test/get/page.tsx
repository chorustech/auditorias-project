import { POINTER_AREAS } from "@/src/shared/domain/Entities/Questions";
import { getReportesAction } from "@/src/reporte-auditoria/infrastructure/actions/get-all";
import { IQuery } from "@/src/shared/domain/Entities/Query";
import {
  Metadata,
} from "@/src/reporte-auditoria/domain/entities";
import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";

export const dynamic = "force-dynamic";

function getRandomItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export default async function Page() {
  const randomArea = getRandomItem(POINTER_AREAS);

  const defaultQuery: IQuery<ReporteAuditoriaConDetalles<Metadata>> = {
    page: 1,
    perPage: 100,
    order: "desc",
    orderBy: "timestamp",
    filters: [],
  };

  let reportes: ReporteAuditoriaConDetalles<Metadata>[] = [];

  try {
    reportes = await getReportesAction(randomArea, defaultQuery);
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