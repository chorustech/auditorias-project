"use client";

/* COMPONENTS */
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

/* HOOKS */
import { Controller, useFormContext, FieldValues } from "react-hook-form";

/* TYPES */
import { DinamicComboboxProps } from "@/components/shared/form/types/dinamicComboboxProps";

export function DinamicCombobox<T extends FieldValues>({
  name,
  label,
  items,
  placeholder,
  rules,
  getTextColor,
}: DinamicComboboxProps<T>) {
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
          <Combobox
            items={items}
            value={field.value ?? ""}
            onValueChange={field.onChange}
            itemToStringValue={(item) => item}
          >
            <ComboboxInput
              placeholder={placeholder}
              className={`outline-none w-full py-4 border font-bold border-neutral-200 rounded-xl transition-all duration-300 ${
                getTextColor ? getTextColor(field.value) : ""
              }`}
            />

            <ComboboxContent className="bg-white border border-neutral-200">
              <ComboboxEmpty>No se encontraron resultados</ComboboxEmpty>

              <ComboboxList>
                {(item) => (
                  <ComboboxItem
                    key={item}
                    value={item}
                    className="data-highlighted:bg-neutral-200"
                  >
                    <span>{item}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )}
      />

      {error?.message && (
        <p className="text-red-500 text-sm">{String(error.message)}</p>
      )}
    </div>
  );
}
