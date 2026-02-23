import { clsAppError } from "./AppError";

export class BadRequestError extends clsAppError {
  constructor(message: string) {
    super(message, 400);
  }
}
