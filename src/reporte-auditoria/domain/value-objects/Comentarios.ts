import { BadRequestError } from "@/src/shared/domain/Entities/Errors/BadRequest";

export class VO_Comentarios {
  private _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static validate(value: string) {
    if (!value && typeof value == "string") {
      throw new BadRequestError(
        "Si va agregar un comentario que minimo sea texto",
      );
    }

    if (value.length > 500) {
      throw new BadRequestError(
        "Asegurese de que el comentario no tenga mas de 500 caracteres",
      );
    }

    return value;
  }

  static create(value: string): VO_Comentarios {
    return new VO_Comentarios(VO_Comentarios.validate(value));
  }
}
