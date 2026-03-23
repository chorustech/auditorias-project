"use client";

/* HOOKS */
import { Controller, useFormContext, FieldValues } from "react-hook-form";

/* TYPES */
import { DinamicInputTextProps } from "@/components/shared/form/types/dinamicInputTextProps";

export function DinamicInputText<T extends FieldValues>({
  name,
  label,
  placeholder,
  rules,
  type = "text",
}: DinamicInputTextProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && <p>{label}</p>}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:bg-blue-100 transition-all duration-300 placeholder:text-neutral-500"
          />
        )}
      />

      {error?.message && (
        <p className="text-red-500 text-sm">{String(error.message)}</p>
      )}
    </div>
  );
}
