import { IQuery } from "@/src/shared/domain/Entities/Query";
import { Metadata } from "../domain/entities";
import { SearchArea } from "../domain/repositorios/areas";
import { ReporteAuditoriaRepositorio } from "../domain/repository";
import { ReporteAuditoriaConDetalles } from "../domain";

export class obtenerReportes<M extends Metadata> {
  constructor(
    private readonly reportesRepo: ReporteAuditoriaRepositorio<M>,
    private readonly searchArea: SearchArea,
  ) {}

  async execute(
    slug: string,
    query: IQuery<ReporteAuditoriaConDetalles<Metadata>>,
  ) {
    const area = await this.searchArea.search(slug);

    if (area == 0)
      throw new Error(`El Area no fue encontrada con el slug: ${slug}`);

    const reportes = await this.reportesRepo.getAll(area, query);

    return reportes;
  }
}
