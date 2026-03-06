import { RegisterOptions, FieldValues, Path } from "react-hook-form";

export type DinamicInputTextProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  rules?: RegisterOptions<T, Path<T>>;
};
