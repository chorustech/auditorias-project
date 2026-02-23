import { Respuesta } from "@/src/shared/domain/Entities/Questions";
import { VO_EsNegativo } from "./value-objects/EsNegativo";
import { VO_Comentarios } from "./value-objects/Comentarios";

export interface ReporteAuditoriaPrimitivo {
  id: number;
  area_id: number;
  auditor_id: number;
  timestamp: Date;
  semana: number;
  linea_o_ubicacion: string;
  coordinador_o_picker: string;
  respuestas: Respuesta[];
  comentarios: string | null;
  es_negativo: boolean;
}

export class ReporteAuditoria {
  id: number;
  area_id: number;
  auditor_id: number;
  timestamp: Date;
  semana: number;
  linea_o_ubicacion: string;
  coordinador_o_picker: string;
  respuestas: Respuesta[];
  comentarios: VO_Comentarios | null;
  es_negativo: VO_EsNegativo;

  private constructor(
    id: number,
    area_id: number,
    auditor_id: number,
    timestamp: Date,
    semana: number,
    linea_o_ubicacion: string,
    coordinador_o_picker: string,
    respuestas: Respuesta[],
    es_negativo: VO_EsNegativo,
    comentarios?: VO_Comentarios,
  ) {
    this.id = id;
    this.area_id = area_id;
    this.auditor_id = auditor_id;
    this.timestamp = timestamp;
    this.semana = semana;
    this.linea_o_ubicacion = linea_o_ubicacion;
    this.coordinador_o_picker = coordinador_o_picker;
    this.respuestas = respuestas;
    this.comentarios = comentarios ?? null;
    this.es_negativo = es_negativo;
  }

  static create(
    area_id: number,
    auditor_id: number,
    semana: number,
    linea_o_ubicacion: string,
    coordinador_o_picker: string,
    respuestas: Respuesta[],
    es_negativo: VO_EsNegativo,
    comentarios?: VO_Comentarios,
  ) {
    return new ReporteAuditoria(
      0,
      area_id,
      auditor_id,
      new Date(),
      semana,
      linea_o_ubicacion,
      coordinador_o_picker,
      respuestas,
      es_negativo,
      comentarios,
    );
  }
}
