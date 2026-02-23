import { SaveReportDto } from "../domain/ports/dtos/save-report.dto";
import { SearchArea } from "../domain/repositorios/areas";
import { ReporteAuditoriaRepositorio } from "../domain/repository";

export class GuardarReporte {
  constructor(
    private readonly reportesRepo: ReporteAuditoriaRepositorio,
    private readonly searchArea: SearchArea,
  ) {}

  async execute({
    auditor_id,
    slug,
    respuestas,
    linea_o_ubicacion,
    coordinador_o_picker,
    comentarios,
    semana,
  }: SaveReportDto) {
    // TODO: Validar existencia del auditor

    const areaFound = await this.searchArea.search(slug);
    if (areaFound == 0)
      throw new Error(`El Area no fue encontrada con el slug: ${slug}`);

    // TODO: Validar Coordinador o Picker
  }
}
