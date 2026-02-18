type GeneralQuestion = {
  pointer: string;
  sections: {
    name: string;
    questions: {
      id: number;
      sentence: string;
    }[];
  }[];
}[];

export const generalReportQuestions: GeneralQuestion = [
  {
    pointer: "baldwin-state",
    sections: [
      {
        name: "Coordinador",
        questions: [
          {
            id: 1,
            sentence:
              "Durante el surtido de materiales, ¿Son utilizados los catálogos, ayudas visuales o instrucciones de trabajo?",
          },
          {
            id: 2,
            sentence:
              "En el Pick List los materiales surtidos deben ser remarcados por el coordinador, así como hacer el uso del sello de material revisado",
          },
        ],
      },
    ],
  },
];
