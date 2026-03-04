import { ReporteAuditoriaRepositorio } from "../domain/repository";

export class DeleteReporte {
  constructor(private readonly reportesRepo: ReporteAuditoriaRepositorio<any>) {}

  async execute(id: number): Promise<void> {
    await this.reportesRepo.delete(id);
  }
}
