import { Respuesta } from "@/src/shared/domain/Entities/Questions";

export class VO_EsNegativo {
  private _value: boolean;

  private constructor(value: boolean) {
    this._value = value;
  }

  static create(respuestas: Respuesta[]): VO_EsNegativo {
    let counter = 0;
    respuestas.forEach((r) => {
      if (r.respuesta == true) {
        counter += 1;
      }
    });

    if (counter >= respuestas.length / 2) {
      return new VO_EsNegativo(true);
    }

    return new VO_EsNegativo(false);
  }
}
