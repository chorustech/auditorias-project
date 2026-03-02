"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
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
  unidadesNegocio,
  responsables,
  descripcionesProd,
  ponderancias,
  areas,
} from "@/content/reports/data/comboboxItems/comboboxItems";

/* HOOKS */
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import {
  ArrowLeft,
  ChevronDown,
  CircleCheckBig,
  CircleOff,
  Loader,
  Save,
} from "lucide-react";

/* LIBS */
import { motion } from "framer-motion";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTION */
import { insertRacReport } from "@/temp/reports/insertRacReport";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { RacFormValues } from "@/content/reports/types/reports/racFormValues";

/* UTILS */
import { getDate, getWeekNumber } from "@/utils/date";

export function InsertUpdateRacReportContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();
  const [saving, setSaving] = useState(false);

  const methods = useForm<RacFormValues>({
    defaultValues: {
      responsable: "",
      numParte: "",
      descProd: "",
      sizeLote: 1,
      ponderancia: "",
      codigoFecha: "",
      area: "",
      porcFalla: 1,
      descProb: "",
    },
  });

  const onSubmit = async (data: RacFormValues) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("responsable", data.responsable);
      formData.append("numParte", data.numParte);
      formData.append("descProd", data.descProd);
      formData.append("sizeLote", data.sizeLote.toString());
      formData.append("ponderancia", data.ponderancia);

      if (data.codigoFecha !== undefined) {
        formData.append("codigoFecha", data.codigoFecha);
      }

      formData.append("area", data.area);
      formData.append("porcFalla", data.porcFalla.toString());
      formData.append("descProb", data.descProb);

      if (data.archivo instanceof FileList && data.archivo.length > 0) {
        formData.append("archivo", data.archivo.item(0)!);
      }

      const response = await insertRacReport(formData);

      if (response.ok) {
        setAnnouncement(
          true,
          "bg-green-500",
          <div className="flex gap-2 items-center">
            <CircleCheckBig className="size-4 text-white" />
            <p className="text-white">{response.message}</p>
          </div>,
        );
        console.log(data);

        //methods.reset();
      } else {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex gap-2 items-center">
            <CircleOff className="size-4 text-white" />
            <p className="text-white">{response.message}</p>
          </div>,
        );
      }

      setSaving(false);
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
          action={() => router.push("/reports/rac")}
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
            Abierto por: <span className="text-[#00A0D0]">Pirita Dreemurr</span>
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
          <div className="w-2/3 rounded-2xl border border-neutral-200 flex flex-col min-h-0">
            {/* HEADER */}
            <div className="w-full h-fit p-4 shrink-0 border-b border-b-neutral-200">
              <p className="font-light text-lg">Preguntas de auditoría</p>
            </div>

            {/* BODY */}
            <div className="overflow-y-auto flex-1 min-h-0 p-4 flex flex-col gap-4">
              {/* RESPONSABLE */}
              <div className="flex flex-col gap-2 w-full">
                <p>Responsable del área</p>
                <Controller
                  control={methods.control}
                  name="responsable"
                  rules={{
                    required: "El responsable es necesario",
                  }}
                  render={({ field }) => (
                    <Combobox
                      items={responsables}
                      value={field.value}
                      onValueChange={(value) =>
                        field.onChange(responsables.find((l) => l === value))
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
                                  Seleccione el responsable de área
                                </p>
                              )}
                            </div>

                            <ChevronDown className="size-4" />
                          </Button>
                        }
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList className={"h-fit max-h-30"}>
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
                {methods.formState.errors.responsable && (
                  <p className="text-red-500">
                    {methods.formState.errors.responsable.message}
                  </p>
                )}
              </div>

              <div className="w-full h-fit grid grid-cols-2 gap-4">
                {/* NÚMERO DE PARTE */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Número de parte</p>
                  <Controller
                    name="numParte"
                    control={methods.control}
                    rules={{
                      required: "El número de parte es necesario",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type="text"
                        id="numParte"
                        minLength={2}
                        maxLength={50}
                        placeholder="Ingrese el número de parte"
                        className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                      />
                    )}
                  />
                  {methods.formState.errors.numParte && (
                    <p className="text-red-500">
                      {methods.formState.errors.numParte?.message}
                    </p>
                  )}
                </div>

                {/* DESCRIPCIÓN DE PRODUCTO */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Descripción prod.</p>
                  <Controller
                    control={methods.control}
                    name="descProd"
                    rules={{
                      required: "La descripción de producto es necesaria",
                    }}
                    render={({ field }) => (
                      <Combobox
                        items={descripcionesProd}
                        value={field.value}
                        onValueChange={(value) =>
                          field.onChange(
                            descripcionesProd.find((l) => l === value),
                          )
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
                                    Seleccione la descripción de producto
                                  </p>
                                )}
                              </div>

                              <ChevronDown className="size-4" />
                            </Button>
                          }
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList className={"h-fit max-h-30"}>
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
                  {methods.formState.errors.descProd && (
                    <p className="text-red-500">
                      {methods.formState.errors.descProd.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full h-fit grid grid-cols-2 gap-4">
                {/* TAMAÑO DE LOTE */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Tamaño de lote</p>
                  <Controller
                    name="sizeLote"
                    control={methods.control}
                    rules={{ required: "El tamaño de lote es necesario" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        onBlur={onBlur}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                          onChange(val); // Actualiza el estado con solo números
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "-" || e.key === "+") {
                            e.preventDefault(); // Bloquea la entrada de estos caracteres
                          }
                        }}
                        value={value}
                        type="text" // Cambia a "text" para evitar comportamientos extraños con números
                        inputMode="numeric" // Ayuda en móviles
                        pattern="[0-9]*" // Solo números
                        id="sizeLote"
                        placeholder="1000"
                        min={1}
                        max={99}
                        className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                      />
                    )}
                  />
                  {methods.formState.errors.sizeLote && (
                    <p className="text-red-500">
                      {methods.formState.errors.sizeLote.message}
                    </p>
                  )}
                </div>

                {/* PONDERANCIA */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Ponderancia</p>
                  <Controller
                    control={methods.control}
                    name="ponderancia"
                    rules={{
                      required: "La ponderancia es necesaria",
                    }}
                    render={({ field }) => (
                      <Combobox
                        items={ponderancias}
                        value={field.value}
                        onValueChange={(value) =>
                          field.onChange(ponderancias.find((l) => l === value))
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
                                    Seleccione la ponderancia
                                  </p>
                                )}
                              </div>

                              <ChevronDown className="size-4" />
                            </Button>
                          }
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList className={"h-fit max-h-30"}>
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
                  {methods.formState.errors.ponderancia && (
                    <p className="text-red-500">
                      {methods.formState.errors.ponderancia.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full h-fit grid grid-cols-2 gap-4">
                {/* CÓDIGO DE FECHA */}
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-nowrap">Código de fecha (Opcional)</p>
                  <Controller
                    name="codigoFecha"
                    control={methods.control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type="text"
                        id="codigoFecha"
                        minLength={2}
                        maxLength={50}
                        placeholder="Ingrese el código de fecha"
                        className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                      />
                    )}
                  />
                  {methods.formState.errors.codigoFecha && (
                    <p className="text-red-500">
                      {methods.formState.errors.codigoFecha?.message}
                    </p>
                  )}
                </div>

                {/* ÁREA */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Área</p>
                  <Controller
                    control={methods.control}
                    name="area"
                    rules={{
                      required: "El área es necesaria",
                    }}
                    render={({ field }) => (
                      <Combobox
                        items={areas}
                        value={field.value}
                        onValueChange={(value) =>
                          field.onChange(areas.find((l) => l === value))
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
                                    Seleccione el área
                                  </p>
                                )}
                              </div>

                              <ChevronDown className="size-4" />
                            </Button>
                          }
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList className={"h-fit max-h-30"}>
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
                  {methods.formState.errors.area && (
                    <p className="text-red-500">
                      {methods.formState.errors.area.message}
                    </p>
                  )}
                </div>
              </div>

              {/* PORCENTAJE DE FALLA */}
              <div className="flex flex-col gap-2 w-full">
                <p>Porcentaje de falla</p>
                <Controller
                  name="porcFalla"
                  control={methods.control}
                  rules={{ required: "El porcentaje de falla es necesario" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      onBlur={onBlur}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                        onChange(val); // Actualiza el estado con solo números
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "e" || e.key === "-" || e.key === "+") {
                          e.preventDefault(); // Bloquea la entrada de estos caracteres
                        }
                      }}
                      value={value}
                      type="text" // Cambia a "text" para evitar comportamientos extraños con números
                      inputMode="numeric" // Ayuda en móviles
                      pattern="[0-9]*" // Solo números
                      id="porcFalla"
                      placeholder="10"
                      min={1}
                      max={99}
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.porcFalla && (
                  <p className="text-red-500">
                    {methods.formState.errors.porcFalla.message}
                  </p>
                )}
              </div>

              {/* DESCRIPCIÓN DEL PROBLEMA */}
              <div className="flex flex-col gap-2">
                <p className="truncate">Desc. problema</p>
                <Controller
                  name="descProb"
                  control={methods.control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <textarea
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      id="descProb"
                      minLength={30}
                      maxLength={750}
                      placeholder="Ingrese la descripción del problema"
                      className="w-full text-sm resize-none h-40 px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.descProb && (
                  <p className="ml-1 text-red-500">
                    {methods.formState.errors.descProb?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-1/3 min-w-1/3 flex flex-col justify-between rounded-2xl border border-neutral-200">
            {/* HEADER */}
            <div className="w-full h-fit p-4 shrink-0 border-b border-b-neutral-200">
              <p className="font-light text-lg">Guardar</p>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 px-4 pt-4 relative">
              {/* ARCHIVO */}
              <div className="flex flex-col gap-2 h-full">
                <p className="truncate">Adjuntar archivo (opcional)</p>
                <input
                  type="file"
                  className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500 cursor-pointer"
                  {...methods.register("archivo", {
                    /* required: "Archivo requerido", */
                    validate: (value) => {
                      if (value instanceof FileList) {
                        const file = value.item(0);

                        if (file) {
                          if (file.size > 5_000_000)
                            return "El archivo debe pesar menos de 5MB";
                        }
                        //return "Archivo requerido";
                      }

                      return true;
                    },
                  })}
                />
                {methods.formState.errors.archivo && (
                  <p className="ml-1 text-red-500">
                    {methods.formState.errors.archivo?.message}
                  </p>
                )}
              </div>

              {/* BOTÓN GUARDAR */}
              <div className="w-full sticky bottom-0 py-4 bg-white">
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
          </div>
        </FormProvider>
      </div>
    </motion.div>
  );
}
