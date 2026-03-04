import { SearchArea } from "../domain/repositorios/areas";
import { ReporteAuditoriaRepositorio } from "../domain/repository";

export class obtenerReportes {
  constructor(
    private readonly reportesRepo: ReporteAuditoriaRepositorio,
    private readonly searchArea: SearchArea,
  ) {}

  async execute(slug: string) {
    const area = await this.searchArea.search(slug);

    if (area == 0) {
      throw new Error(`El Area no fue encontrada con el slug: ${slug}`);
    }

    const reportes = await this.reportesRepo.getAll(area);

    return reportes;
  }
}
