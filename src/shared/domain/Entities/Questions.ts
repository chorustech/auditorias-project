export interface Encuesta {
  nombre: string;
  preguntas: Pregunta[];
}

export interface Respuesta {
  pregunta: Pregunta;
  respuesta: boolean;
}

export interface Pregunta {
  id: number;
  categoria: "coordinador" | "matrices" | "herramientas" | "operador";
  texto: string;
}
