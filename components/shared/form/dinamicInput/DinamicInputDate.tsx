"use client";

/* COMPONENTS */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

/* ICONS */
import { Calendar as CalendarIcon } from "lucide-react";

/* HOOKS */
import { Controller, useFormContext, FieldValues } from "react-hook-form";

/* TYPES */
import { DinamicInputCalendarProps } from "@/components/shared/form/types/dinamicInputCalendarProps";
import { DateRange } from "react-day-picker";

/* LIBS */
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function DinamicInputDate<T extends FieldValues>({
  name,
  label,
  placeholder,
  rules,
  mode = "single",
}: DinamicInputCalendarProps<T>) {
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
        render={({ field: { onChange, value } }) => {
          const renderValue = () => {
            if (!value) return null;

            if (mode === "single") {
              return format(value as Date, "PPP", { locale: es });
            }

            const range = value as DateRange;

            if (range?.from && range?.to) {
              return `${format(range.from, "PPP", { locale: es })} - ${format(
                range.to,
                "PPP",
                { locale: es },
              )}`;
            }

            if (range?.from) {
              return format(range.from, "PPP", { locale: es });
            }

            return null;
          };

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full px-6 py-4 bg-transparent justify-between border border-neutral-200 text-left text-black rounded-xl hover:bg-sky-100 cursor-pointer font-normal">
                  {value ? (
                    renderValue()
                  ) : (
                    <span className="text-neutral-500">{placeholder}</span>
                  )}
                  <CalendarIcon className="size-4 text-neutral-500" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto p-0 bg-white border-2 border-neutral-100 z-100"
                align="start"
              >
                {mode === "single" ? (
                  <Calendar
                    mode="single"
                    selected={value as Date | undefined}
                    onSelect={onChange}
                    locale={es}
                    /* disabled={(date) => date < today} */
                  />
                ) : (
                  <Calendar
                    mode="range"
                    selected={value as DateRange | undefined}
                    onSelect={onChange}
                    locale={es}
                    numberOfMonths={2}
                  />
                )}
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {error?.message && (
        <p className="text-red-500 text-sm">{String(error.message)}</p>
      )}
    </div>
  );
}
