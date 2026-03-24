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
  try {
    const repo = new ReporteAuditoriaNeon();
    const searchArea = new SearchAreaNeon();
    const useCase = new obtenerReportes(repo, searchArea);

    const data = await useCase.execute(slug, query);

    console.log("Reportes obtenidos:", data);
    return {
      data: data,
      count: data.length,
      ok: true,
      message: "reportes obtenidos correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Ocurrió un error al obtener los reportes",
      data: [],
      count: 0,
    };
  }
}
