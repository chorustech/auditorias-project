import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type DinamicInputRadioButtons<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  items: string[];
  rules?: RegisterOptions<T, Path<T>>;
};
