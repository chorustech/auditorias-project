import { Metadata } from "./entities";

export interface ReporteAuditoriaPrimitivo<M extends Metadata> {
  id: number;
  area_id: number;
  auditor_id: number;
  timestamp: Date;
  semana: number;
  respuestas: boolean[];
  comentarios: string | null;
  es_negativo: boolean;
  metadata: M;
  archivo_url: string | null;
}

export interface ReporteAuditoriaConDetalles<
  M extends Metadata,
> extends ReporteAuditoriaPrimitivo<M> {
  auditor: string;
  tipo_auditoria: string;
  type:
    | "baldwin-state"
    | "baldwin-reserve-supply"
    | "baldwin-reserve-stacking"
    | "baldwin-reserve-packing"
    | "baldwin-reserve-general"
    | "display-area"
    | "pizza-tray"
    | "eola"
    | "ncr"
    | "rac"
    | "general";
}

export class ReporteAuditoria<M extends Metadata> {
  id: number;
  area_id: number;
  auditor_id: number;
  timestamp: Date;
  semana: number;
  respuestas: boolean[];
  comentarios: string | null;
  es_negativo: boolean;
  metadata: M;
  archivo_url: string | null;

  private constructor(
    id: number,
    area_id: number,
    auditor_id: number,
    timestamp: Date,
    semana: number,
    respuestas: boolean[],
    esNegativo: boolean,
    metadata: M,
    comentarios: string | null,
    archivo_url: string | null, // ✅ nuevo
  ) {
    this.id = id;
    this.area_id = area_id;
    this.auditor_id = auditor_id;
    this.timestamp = timestamp;
    this.semana = semana;
    this.respuestas = respuestas;
    this.comentarios = comentarios ?? null;
    this.es_negativo = esNegativo;
    this.metadata = metadata;
    this.archivo_url = archivo_url;
  }

  static create<M extends Metadata>(
    area_id: number,
    auditor_id: number,
    semana: number,
    respuestas: boolean[],
    metadata: M,
    comentarios: string | null,
    archivo_url: string | null, // ✅ nuevo
  ) {
    const esNegativo = ReporteAuditoria.esNegativo(respuestas);
    return new ReporteAuditoria<M>(
      0,
      area_id,
      auditor_id,
      new Date(),
      semana,
      respuestas,
      esNegativo,
      metadata,
      comentarios,
      archivo_url,
    );
  }

  static esNegativo(respuestas: boolean[]) {
    const positivas = respuestas.filter((r) => r).length;
    return positivas >= respuestas.length / 2;
  }

  toPrimitive(): ReporteAuditoriaPrimitivo<M> {
    return {
      id: this.id,
      area_id: this.area_id,
      auditor_id: this.auditor_id,
      timestamp: this.timestamp,
      semana: this.semana,
      respuestas: this.respuestas,
      comentarios: this.comentarios,
      es_negativo: this.es_negativo,
      metadata: this.metadata,
      archivo_url: this.archivo_url,
    };
  }
}
