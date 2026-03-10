import { RegisterOptions, FieldValues, Path } from "react-hook-form";

export type DinamicInputCalendarProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<T, Path<T>>;
  mode?: "single" | "range";
};
