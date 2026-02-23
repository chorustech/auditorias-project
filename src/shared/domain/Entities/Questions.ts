export interface Encuesta {
  nombre: string;
  preguntas: Pregunta[];
}

export interface Respuesta {
  id_pregunta: number;
  respuesta: boolean;
}

export interface Pregunta {
  id_pregunta: number;
  categoria: "coordinador" | "matrices" | "herramientas" | "operador";
  texto: string;
}
