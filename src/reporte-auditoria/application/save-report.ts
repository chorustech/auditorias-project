import { uploadToR2 } from "@/utils/uploadToR2";
import { ReporteAuditoria } from "../domain";
import { Metadata } from "../domain/entities";
import { SaveReportDto } from "../domain/ports/dtos/save-report.dto";
import { SearchArea } from "../domain/repositorios/areas";
import { ReporteAuditoriaRepositorio } from "../domain/repository";

export class GuardarReporte<M extends Metadata> {
  constructor(
    private readonly reportesRepo: ReporteAuditoriaRepositorio<M>,
    private readonly searchArea: SearchArea,
  ) {}

  async execute({ slug, data, metadata, archivo }: SaveReportDto<M>) {
    const areaId = await this.searchArea.search(slug);
    if (areaId === 0)
      throw new Error(`El Area no fue encontrada con el slug: ${slug}`);

    // ✅ Subir archivo si existe
    let archivo_url: string | null = null;
    if (archivo) {
      archivo_url = await uploadToR2(archivo);
    }

    const reporte = ReporteAuditoria.create(
      areaId,
      data.auditor_id,
      data.semana,
      data.respuestas,
      metadata,
      data.comentarios,
      archivo_url, // ✅
    );

    await this.reportesRepo.save(reporte);
  }
}
