"use client";

/* HOOKS */
import { Controller, useFormContext, FieldValues } from "react-hook-form";

/* TYPES */
import { DinamicInputTextAreaProps } from "@/components/shared/form/types/dinamicInputTextAreaProps";

export function DinamicInputTextArea<T extends FieldValues>({
  name,
  label,
  placeholder,
  rules,
}: DinamicInputTextAreaProps<T>) {
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
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            className="w-full text-sm resize-none h-40 px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-blue-100 transition-all duration-300 placeholder:text-neutral-500"
          />
        )}
      />

      {error?.message && (
        <p className="text-red-500 text-sm">{String(error.message)}</p>
      )}
    </div>
  );
}
