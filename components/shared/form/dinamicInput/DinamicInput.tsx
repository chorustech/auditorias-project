"use client";

import { useFormContext } from "react-hook-form";

export function DinamicInput({
  name,
  label,
  placeholder,
  value,
  disabled,
}: {
  name: string;
  label: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
}) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        {...register(name)}
      />
    </div>
  );
}
