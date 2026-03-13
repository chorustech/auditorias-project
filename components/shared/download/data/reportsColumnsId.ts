export const baldwinStateColumnsId: {
  main: string[];
  sections?: {
    title: string;
    sentences: string[];
  }[];
} = {
  main: ["A", "B", "C", "D", "E", "F", "G"],
  sections: [
    { title: "H", sentences: ["H", "I", "J", "K"] },
    { title: "L", sentences: ["L"] },
    { title: "M", sentences: ["M", "N"] },
    {
      title: "O",
      sentences: ["O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"],
    },
  ],
};
