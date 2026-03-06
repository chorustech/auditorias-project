import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type DinamicComboboxProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  items: string[];
  placeholder?: string;
  rules?: RegisterOptions<T, Path<T>>;
  getTextColor?: (value: string) => string;
};
