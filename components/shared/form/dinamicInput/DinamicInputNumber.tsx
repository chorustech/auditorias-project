"use client";

/* HOOKS */
import { Controller, useFormContext, FieldValues } from "react-hook-form";

/* TYPES */
import { DinamicInputNumberProps } from "@/components/shared/form/types/dinamicInputNumberProps";

export function DinamicInputNumber<T extends FieldValues>({
  name,
  label,
  placeholder,
  rules,
  min,
  max,
  disabled,
}: DinamicInputNumberProps<T>) {
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
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            onBlur={onBlur}
            value={value ?? ""}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              onChange(val);
            }}
            onKeyDown={(e) => {
              if (["e", "-", "+"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            id={name}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={disabled}
            className={`w-full text-sm h-fit px-4 py-2 outline-none border border-neutral-200 rounded-xl transition-all duration-300 placeholder:text-neutral-500 ${disabled ? "bg-neutral-100 pointer-events-none text-neutral-400" : "bg-transparent hover:bg-blue-100"}`}
          />
        )}
      />

      {error?.message && (
        <p className="text-red-500 text-sm">{String(error.message)}</p>
      )}
    </div>
  );
}
