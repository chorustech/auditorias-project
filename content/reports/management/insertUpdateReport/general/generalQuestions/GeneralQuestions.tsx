"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* HOOKS */
import { Controller, useFormContext } from "react-hook-form";

/* ICONS */
import { Check, X } from "lucide-react";

/* TYPES */
import { ReportFormValues } from "@/content/reports/types/forms/reportFormValues";

export function GeneralQuestions({
  sections,
}: {
  sections: {
    name: string;
    questions: {
      sentence: string;
      subquestions?:
        | {
            sentence: string;
          }[]
        | undefined;
    }[];
  }[];
}) {
  const { control } = useFormContext<ReportFormValues>();
  let count = 0;

  return sections.map((section, index) => (
    <div key={index} className="mb-4">
      <p className="font-light text-lg text-[#00A0D0] mb-2">{section.name}</p>
      <div className="flex flex-col">
        {section.questions.map((question, index) => {
          count++;

          return (
            <div
              key={index}
              className={`p-4 rounded-2xl ${index % 2 === 0 ? "" : "bg-neutral-100"}`}
            >
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <div className="rounded-full border border-[#00A0D0] w-7 h-7 flex items-center justify-center min-h-7 min-w-7">
                    <p className="text-xs text-[#00A0D0]">{count}</p>
                  </div>
                  <p>{question.sentence}</p>
                </div>

                <Controller
                  control={control}
                  name={`respuestas.${count - 1}`}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="flex gap-2">
                      <BouncingButton
                        action={() => field.onChange(true)}
                        backgroundColorHover="#22c55e"
                        backgroundColor={`${field.value === true ? "#22c55e" : "#ffffff"}`}
                        textColor={`${field.value === true ? "#ffffff" : "#22c55e"}`}
                        textColorHover="#ffffff"
                        border="2px solid #22c55e"
                        borderHover="2px solid #22c55e"
                        twClassName="w-fit h-fit px-4 py-2 rounded-2xl"
                        disabled={false}
                      >
                        <Check className="size-4" />
                        <p>Pasa</p>
                      </BouncingButton>
                      <BouncingButton
                        action={() => field.onChange(false)}
                        backgroundColorHover="#ef4444"
                        backgroundColor={`${field.value !== true ? "#ef4444" : "#ffffff"}`}
                        textColor={`${field.value !== true ? "#ffffff" : "#ef4444"}`}
                        textColorHover="#ffffff"
                        border="2px solid #ef4444"
                        borderHover="2px solid #ef4444"
                        twClassName="w-fit h-fit px-4 py-2 rounded-2xl"
                        disabled={false}
                      >
                        <X className="size-4" />
                        <p>Falla</p>
                      </BouncingButton>
                    </div>
                  )}
                />
              </div>

              {question.subquestions && (
                <div className="ml-12 mt-2 gap-2 flex flex-col">
                  {question.subquestions.map((subQuestion, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="rounded-full border border-[#00A0D0] w-7 h-7 flex items-center justify-center min-h-7 min-w-7">
                        <p className="text-xs text-[#00A0D0]">
                          {count}.{index + 1}
                        </p>
                      </div>
                      <p className="text-neutral-500">{subQuestion.sentence}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ));
}
