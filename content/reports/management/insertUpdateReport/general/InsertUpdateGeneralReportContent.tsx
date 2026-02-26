"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

/* DATA */
import {
  lineas,
  worktables,
} from "@/content/reports/data/comboboxItems/comboboxItems";
import { reportsQuestions } from "@/content/reports/data/questions/reportsQuestions";

/* HOOKS */
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { ArrowLeft, Check, ChevronDown, Loader, Save, X } from "lucide-react";

/* NAVIGATION */
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

/* TYPES */
import { ReportFormValues } from "@/content/reports/types/Report";

/* UTILS */
import { getDate, getWeekNumber } from "@/utils/date";

/* LIBS */
import { motion } from "framer-motion";

export function InsertUpdateGeneralReportContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setAnnouncement } = useAnnouncement();
  const [saving, setSaving] = useState(false);
  let count = 0;

  const rawPath = pathname.split("/").at(isUpdate ? -3 : -2);
  const path = rawPath ?? null;

  const methods = useForm<ReportFormValues>({
    defaultValues: {
      linea: "",
      coord: "",
      picker: "",
      ubicacion: "",
      worktable: "",
      respuestas: [],
    },
  });

  const onSubmit = async (data: ReportFormValues) => {
    try {
      setSaving(true);

      // Simular delay del backend
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log(data);

      setAnnouncement(
        true,
        "bg-green-500",
        <p className="text-white">Reporte guardado correctamente</p>,
      );

      setSaving(false);
      /* setTerminado(false);

      const response = await InsertComision(data);

      if (response.ok) {
        setAnnouncement(
          true,
          "bg-green-700",
          <p className="text-white">Correo envíado correctamente</p>,
        );
        setTerminado(true);
        methods.reset();
      } else {
        setAnnouncement(
          true,
          "bg-red-700",
          <p className="text-white">{response.message}</p>,
        );
        setTerminado(true);
      } */
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <motion.div
      className="w-full h-full p-6 max-h-full flex flex-col gap-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* HEADER */}
      <div className="w-full flex items-center justify-between h-fit">
        {/* BOTÓN IR HACIA ATRÁS */}
        <BouncingButton
          action={() => router.push(`/reports/${path}`)}
          backgroundColorHover="#ffffff"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit p-4 rounded-2xl"
          disabled={false}
        >
          <ArrowLeft className="size-5" />
        </BouncingButton>

        <div className="flex gap-4">
          <p>
            Auditor: <span className="text-[#00A0D0]">Pirita Dreemurr</span>
          </p>
          <p>
            Fecha: <span className="text-[#00A0D0]">{getDate()}</span>
          </p>
          <p>
            Semana: <span className="text-[#00A0D0]">{getWeekNumber()}</span>
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto flex gap-6 max-h-full">
        <FormProvider {...methods}>
          {/* PREGUNTAS DE INCISOS */}
          <div className="w-full rounded-2xl border border-neutral-200 flex flex-col min-h-0">
            {/* HEADER */}
            <div className="w-full h-fit p-4 shrink-0 border-b border-b-neutral-200">
              <p className="font-light text-lg">Preguntas de auditoría</p>
            </div>

            {/* BODY */}
            <div className="overflow-y-auto flex-1 min-h-0 p-4">
              {reportsQuestions[path ?? ""].sections.map((section, index) => (
                <div key={index} className="mb-4">
                  <p className="font-light text-lg text-[#00A0D0] mb-2">
                    {section.name}
                  </p>
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
                                <p className="text-xs text-[#00A0D0]">
                                  {count}
                                </p>
                              </div>
                              <p>{question.sentence}</p>
                            </div>

                            <Controller
                              control={methods.control}
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
                              {question.subquestions.map(
                                (subQuestion, index) => (
                                  <div key={index} className="flex gap-2">
                                    <div className="rounded-full border border-[#00A0D0] w-7 h-7 flex items-center justify-center min-h-7 min-w-7">
                                      <p className="text-xs text-[#00A0D0]">
                                        {count}.{index + 1}
                                      </p>
                                    </div>
                                    <p className="text-neutral-500">
                                      {subQuestion.sentence}
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PREGUNTAS DE INFORMACIÓN */}
          <div className="w-1/3 overflow-y-hidden flex flex-col justify-between overflow-x-hidden rounded-2xl border border-neutral-200">
            {/* HEADER */}
            <div className="w-full h-fit p-4 shrink-0 border-b border-b-neutral-200">
              <p className="font-light text-lg">Guardar</p>
            </div>

            {/* BODY */}
            <div className="flex-1 min-h-0 p-4 flex flex-col gap-4">
              {/* INPUTS ESPECÍFICOS */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4">
                {/* LINEAS */}
                {(path === "baldwin-state" ||
                  path === "baldwin-reserve-stacking" ||
                  path === "baldwin-reserve-packing" ||
                  path === "baldwin-reserve-general") && (
                  <div className="flex flex-col gap-2">
                    <p>Línea</p>
                    <Controller
                      control={methods.control}
                      name="linea"
                      rules={{
                        required: "La línea es necesaria",
                      }}
                      render={({ field }) => (
                        <Combobox
                          items={lineas}
                          value={field.value}
                          onValueChange={(value) =>
                            field.onChange(lineas.find((l) => l === value))
                          }
                        >
                          <ComboboxTrigger
                            render={
                              <Button className="w-full hover:hover:bg-[#d9f2f9] cursor-pointer justify-center font-normal flex items-center bg-white text-black border border-neutral-200 rounded-xl">
                                <div className="w-full flex justify-start overflow-x-hidden">
                                  <p className="truncate">
                                    <ComboboxValue />
                                  </p>

                                  {field.value === "" && (
                                    <p className="truncate text-neutral-500">
                                      Seleccione una línea
                                    </p>
                                  )}
                                </div>

                                <ChevronDown className="size-4" />
                              </Button>
                            }
                          />
                          <ComboboxContent
                            className={"h-30 w-30 overflow-y-auto"}
                          >
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem
                                  className={"overflow-x-hidden w-full"}
                                  key={item}
                                  value={item}
                                >
                                  <div className="w-full">
                                    <p className="truncate">{item}</p>
                                  </div>
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      )}
                    />
                    {methods.formState.errors.linea && (
                      <p className="ml-1 text-red-500">
                        {methods.formState.errors.linea.message}
                      </p>
                    )}
                  </div>
                )}

                {/* COORDINADOR */}
                {path === "baldwin-state" && (
                  <div className="flex flex-col gap-2">
                    <p>Coordinador</p>
                    <Controller
                      name="coord"
                      control={methods.control}
                      rules={{
                        required: "El nombre del coordinador es necesario",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <input
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          type="text"
                          id="coord"
                          minLength={2}
                          maxLength={50}
                          placeholder="Ingrese el nombre del coordinador"
                          className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                        />
                      )}
                    />
                    {methods.formState.errors.coord && (
                      <p className="ml-1 text-red-500">
                        {methods.formState.errors.coord?.message}
                      </p>
                    )}
                  </div>
                )}

                {/* PICKER */}
                {path === "baldwin-reserve-supply" && (
                  <div className="flex flex-col gap-2">
                    <p>Picker</p>
                    <Controller
                      name="picker"
                      control={methods.control}
                      rules={{
                        required: "El nombre del picker es necesario",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <input
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          type="text"
                          id="picker"
                          minLength={2}
                          maxLength={50}
                          placeholder="Ingrese el nombre del picker"
                          className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                        />
                      )}
                    />
                    {methods.formState.errors.picker && (
                      <p className="ml-1 text-red-500">
                        {methods.formState.errors.picker?.message}
                      </p>
                    )}
                  </div>
                )}

                {/* UBICACIÓN */}
                {path === "pizza-tray" && (
                  <div className="flex flex-col gap-2">
                    <p>Ubicación</p>
                    <Controller
                      name="ubicacion"
                      control={methods.control}
                      rules={{
                        required: "La ubicación es necesaria",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <input
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          type="text"
                          id="ubicacion"
                          minLength={2}
                          maxLength={50}
                          placeholder="Ingrese el nombre de ubicación"
                          className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                        />
                      )}
                    />
                    {methods.formState.errors.ubicacion && (
                      <p className="ml-1 text-red-500">
                        {methods.formState.errors.ubicacion?.message}
                      </p>
                    )}
                  </div>
                )}

                {/* WORKTABLES */}
                {path === "display-area" && (
                  <div className="flex flex-col gap-2">
                    <p>Worktable</p>
                    <Controller
                      control={methods.control}
                      name="worktable"
                      rules={{
                        required: "El worktable es necesario",
                      }}
                      render={({ field }) => (
                        <Combobox
                          items={worktables}
                          value={field.value}
                          onValueChange={(value) =>
                            field.onChange(worktables.find((w) => w === value))
                          }
                        >
                          <ComboboxTrigger
                            render={
                              <Button className="w-full hover:hover:bg-[#d9f2f9] cursor-pointer justify-center font-normal flex items-center bg-white text-black border border-neutral-200 rounded-xl">
                                <div className="w-full flex justify-start overflow-x-hidden">
                                  <p className="truncate">
                                    <ComboboxValue />
                                  </p>

                                  {field.value === "" && (
                                    <p className="truncate text-neutral-500">
                                      Seleccione una worktable
                                    </p>
                                  )}
                                </div>

                                <ChevronDown className="size-4" />
                              </Button>
                            }
                          />
                          <ComboboxContent
                            className={"h-30 w-30 overflow-y-auto"}
                          >
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem
                                  className={"overflow-x-hidden w-full"}
                                  key={item}
                                  value={item}
                                >
                                  <div className="w-full">
                                    <p className="truncate">{item}</p>
                                  </div>
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      )}
                    />
                    {methods.formState.errors.worktable && (
                      <p className="ml-1 text-red-500">
                        {methods.formState.errors.worktable.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* BOTÓN GUARDAR */}
              <BouncingButton
                action={saving ? () => {} : methods.handleSubmit(onSubmit)}
                backgroundColorHover="#ffffff"
                backgroundColor="#00A0D0"
                textColor="#ffffff"
                textColorHover="#00A0D0"
                border="2px solid #ffffff"
                borderHover="2px solid #00A0D0"
                twClassName="w-full h-fit px-4 py-2 rounded-2xl"
                disabled={saving ? true : false}
              >
                {saving ? (
                  <>
                    <span className="text-transparent">E</span>
                    <Loader className="size-4 animate-spin" />
                    <span className="text-transparent">E</span>
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    <span>Guardar</span>
                  </>
                )}
              </BouncingButton>
            </div>
          </div>
        </FormProvider>
      </div>
    </motion.div>
  );
}
