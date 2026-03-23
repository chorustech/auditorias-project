"use client";

/* HOOKS */
import { Controller, FieldValues, useFormContext } from "react-hook-form";

/* TYPES */
import { DinamicInputRadioButtons } from "@/components/shared/form/types/dinamicInputRadioButtonsProps";

export function DynamicInputRadioButtons<T extends FieldValues>({
  name,
  label,
  items,
  rules,
}: DinamicInputRadioButtons<T>) {
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
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  className="accent-[#00A0D0]"
                  value={item}
                  checked={field.value === item}
                  onChange={() => field.onChange(item)}
                />

                <span>{item}</span>
              </label>
            ))}
          </div>
        )}
      />

      {error?.message && (
        <p className="text-red-500 text-sm">{String(error.message)}</p>
      )}
    </div>
  );
}
