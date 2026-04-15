import { uploadToR2 } from "@/utils/uploadToR2";
import { ReporteAuditoria } from "../domain";
import { Metadata } from "../domain/entities";
import { SaveReportDto } from "../domain/ports/dtos/save-report.dto";
import { ReporteAuditoriaRepositorio } from "../domain/repository";

export class UpdateReporte<M extends Metadata> {
  constructor(private readonly reportesRepo: ReporteAuditoriaRepositorio<M>) {}

  async execute(
    id: number,
    { data, metadata, archivo }: Omit<SaveReportDto<M>, "slug">,
  ) {
    let archivo_url: string | null = null;
    if (archivo) {
      archivo_url = await uploadToR2(archivo);
    }

    const reporte = ReporteAuditoria.create(
      data.area_id,
      data.auditor_id,
      data.semana,
      data.respuestas,
      metadata,
      data.comentarios,
      archivo_url,
    );

    await this.reportesRepo.update(id, reporte);
  }
}
