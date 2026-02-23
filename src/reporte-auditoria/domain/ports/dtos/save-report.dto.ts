import { Respuesta } from "@/src/shared/domain/Entities/Questions";

export interface SaveReportDto {
  slug: string;
  auditor_id: string;
  semana: number;
  linea_o_ubicacion: string;
  coordinador_o_picker: string;
  respuestas: Respuesta[];
  comentarios: string | null;
}
