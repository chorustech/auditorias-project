export interface SaveReportDto<M> {
  slug: string;
  metadata: M;
  archivo?: File;
  data: {
    auditor_id: number;
    area_id: number;
    respuestas: boolean[];
    semana: number;
    comentarios: string | null;
  };
}
