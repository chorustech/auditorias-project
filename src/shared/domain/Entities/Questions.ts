export const POINTER_AREAS = [
  "baldwin-state",
] as const;


export type PointerArea = (typeof POINTER_AREAS)[number]

export const isPointerArea = (value: string) => {
  return POINTER_AREAS.includes(value as PointerArea)
}

export type Questions = {
  pointer: PointerArea
  sections: {
    name: string;
    questions: {
      sentence: string;
      subquestions?: {
        sentence: string
      }
    }[]
  }[]
}[]