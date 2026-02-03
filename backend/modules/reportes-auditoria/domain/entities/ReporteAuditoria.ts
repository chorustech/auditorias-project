// backend/core/reportes-auditoria/domain/entities/ReporteAuditoria.ts

/**
 * Representa una sola respuesta a una pregunta de la auditoría.
 */
export type RespuestaItem = {
	pregunta: string;
	respuesta: boolean; // true para "Pasa", false para "Falla"
};

/**
 * Entidad de dominio que representa un Reporte de Auditoría.
 * Contiene toda la lógica de negocio y validaciones intrínsecas al reporte.
 */
export type ReporteAuditoriaPrimitive = {
  id: string; // uuid
  areaId: number;
  auditorId: string; // uuid
  fecha: Date;
  semana: number;
  lineaOubicacion: string;
  coordinadorOpicker: string;
  respuestas: RespuestaItem[];
  comentarios?: string;
  esNegativo: boolean;
};

export class ReporteAuditoria {
  private readonly _id: string; // uuid
  private readonly _areaId: number;
  private readonly _auditorId: string; // uuid
  private readonly _fecha: Date;
  private readonly _semana: number;
  private readonly _lineaOubicacion: string;
  private readonly _coordinadorOpicker: string;
  private readonly _respuestas: RespuestaItem[];
  private readonly _comentarios?: string;
  private readonly _esNegativo: boolean;

  private constructor(props: ReporteAuditoriaPrimitive) {
    this._id = props.id;
    this._areaId = props.areaId;
    this._auditorId = props.auditorId;
    this._fecha = props.fecha;
    this._semana = props.semana;
    this._lineaOubicacion = props.lineaOubicacion;
    this._coordinadorOpicker = props.coordinadorOpicker;
    this._respuestas = props.respuestas;
    this._comentarios = props.comentarios;
    this._esNegativo = props.esNegativo;
  }

  /**
   * Factory method para crear un NUEVO reporte de auditoría.
   * El ID se genera externamente (ej. en la capa de infraestructura) antes de crearlo.
   * Valida las reglas de negocio (invariantes) antes de crear el objeto.
   */
  public static create(
    props: Omit<ReporteAuditoriaPrimitive, "esNegativo">,
  ): ReporteAuditoria {
    // Añadimos "Guard Clauses" para proteger las invariantes del dominio.
    if (props.semana <= 0) {
      throw new Error("La semana debe ser un número positivo.");
    }
    if (props.respuestas.length === 0) {
      throw new Error(
        "Un reporte de auditoría no puede tener cero respuestas.",
      );
    }

    const esNegativo = this.calcularEsNegativo(props.respuestas);

    return new ReporteAuditoria({ ...props, esNegativo });
  }

  /**
   * [Mejora 1] Factory method para RECONSTITUIR un reporte desde la base de datos.
   * Este método confía en que los datos de entrada ya son válidos.
   */
  public static fromPrimitives(
    props: ReporteAuditoriaPrimitive,
  ): ReporteAuditoria {
    return new ReporteAuditoria(props);
  }

  /**
   * Lógica de negocio para calcular si un reporte es negativo.
   * Un reporte es negativo si más del 50% de las respuestas son "Falla".
   */
  private static calcularEsNegativo(respuestas: RespuestaItem[]): boolean {
    if (respuestas.length === 0) return false;

    const fallas = respuestas.filter(r => r.respuesta === false).length;
    return (fallas / respuestas.length) * 100 > 50;
  }

  // Getters para acceder a las propiedades de forma segura (solo lectura).
  get id() {
    return this._id;
  }
  get areaId() {
    return this._areaId;
  }
  get auditorId() {
    return this._auditorId;
  }
  get fecha() {
    return this._fecha;
  }
  get semana() {
    return this._semana;
  }
  get lineaOubicacion() {
    return this._lineaOubicacion;
  }
  get coordinadorOpicker() {
    return this._coordinadorOpicker;
  }
  get respuestas() {
    return this._respuestas;
  }
  get comentarios() {
    return this._comentarios;
  }
  get esNegativo() {
    return this._esNegativo;
  }

  /**
   * Método para convertir la entidad de dominio a un objeto primitivo.
   * Útil para la capa de persistencia o para serializar la respuesta de una API.
   */
  public toPrimitives(): ReporteAuditoriaPrimitive {
    return {
      id: this._id,
      areaId: this._areaId,
      auditorId: this._auditorId,
      fecha: this._fecha,
      semana: this._semana,
      lineaOubicacion: this._lineaOubicacion,
      coordinadorOpicker: this._coordinadorOpicker,
      respuestas: this._respuestas,
      comentarios: this._comentarios,
      esNegativo: this._esNegativo,
    };
  }
}
