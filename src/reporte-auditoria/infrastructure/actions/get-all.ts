"use server";

import { IQuery } from "@/src/shared/domain/Entities/Query";
import { ReporteAuditoriaConDetalles } from "../../domain";
import { Metadata } from "../../domain/entities";
import { ReporteAuditoriaNeon } from "../adapters/repositorio-neon";
import { SearchAreaNeon } from "../adapters/area-find";
import { obtenerReportes } from "../../application/get-all-reportes";

export async function getReportesAction(
  slug: string,
  query: IQuery<ReporteAuditoriaConDetalles<Metadata>>,
) {
  const repo = new ReporteAuditoriaNeon();
  const searchArea = new SearchAreaNeon();
  const useCase = new obtenerReportes(repo, searchArea);

  return await useCase.execute(slug, query);
}
