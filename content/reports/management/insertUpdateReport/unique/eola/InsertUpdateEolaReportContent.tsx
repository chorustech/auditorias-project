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
  tipoEolaReport,
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
import { insertEolaReport } from "@/temp/reports/insertEolaReport";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { EolaFormValues } from "@/content/reports/types/Report";

/* UTILS */
import { getDate, getWeekNumber } from "@/utils/date";

export function InsertUpdateEolaReportContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();
  const [saving, setSaving] = useState(false);

  const methods = useForm<EolaFormValues>({
    defaultValues: {
      uniNegocio: "",
      linea: "",
      tipo: "",
      sku: "",
      upc: "",
      sizeOrden: 0,
      cantInspeccionada: 0,
      cantAceptada: 0,
      numOrden: "",
      comentarios: "",
    },
  });

  const onSubmit = async (data: EolaFormValues) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("uniNegocio", data.uniNegocio);
      formData.append("linea", data.linea);
      formData.append("tipo", data.tipo);
      formData.append("sku", data.sku);
      formData.append("upc", data.upc);
      formData.append("sizeOrden", data.sizeOrden.toString());
      formData.append("cantInspeccionada", data.cantInspeccionada.toString());
      formData.append("cantAceptada", data.cantAceptada.toString());

      // Número de orden EOLA
      if (data.numOrden !== undefined) {
        formData.append("numOrden", data.numOrden);
      }

      formData.append("comentarios", data.comentarios);

      if (data.archivo instanceof FileList && data.archivo.length > 0) {
        formData.append("archivo", data.archivo.item(0)!);
      }

      const response = await insertEolaReport(formData);

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
          action={() => router.push("/reports/eola")}
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
          <div className="w-2/3 rounded-2xl border border-neutral-200 flex flex-col min-h-0">
            {/* HEADER */}
            <div className="w-full h-fit p-4 shrink-0 border-b border-b-neutral-200">
              <p className="font-light text-lg">Preguntas de auditoría</p>
            </div>

            {/* BODY */}
            <div className="overflow-y-auto flex-1 min-h-0 p-4 flex flex-col gap-4">
              <div className="w-full h-fit grid grid-cols-2 gap-4">
                {/* TIPO */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Tipo</p>
                  <Controller
                    control={methods.control}
                    name="tipo"
                    rules={{
                      required: "El tipo es necesario",
                    }}
                    render={({ field }) => (
                      <Combobox
                        items={tipoEolaReport}
                        value={field.value}
                        onValueChange={(value) =>
                          field.onChange(
                            tipoEolaReport.find((l) => l === value),
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
                                    Seleccione el tipo de reporte
                                  </p>
                                )}
                              </div>

                              <ChevronDown className="size-4" />
                            </Button>
                          }
                        />
                        <ComboboxContent className={"w-30 overflow-y-auto"}>
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
                  {methods.formState.errors.tipo && (
                    <p className="text-red-500">
                      {methods.formState.errors.tipo.message}
                    </p>
                  )}
                </div>

                {/* NÚMERO DE ORDEN EOLA */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Número de orden EOLA</p>
                  <Controller
                    name="numOrden"
                    control={methods.control}
                    rules={{
                      required: "El número de orden EOLA es necesario",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type="text"
                        id="numOrden"
                        minLength={2}
                        maxLength={50}
                        placeholder="Ingrese el número de orden"
                        className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                      />
                    )}
                  />
                  {methods.formState.errors.numOrden && (
                    <p className="text-red-500">
                      {methods.formState.errors.numOrden?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full h-fit grid grid-cols-2 gap-4">
                {/* LINEAS */}
                <div className="flex flex-col gap-2 w-full">
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
                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList className={"h-30"}>
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
                    <p className="text-red-500">
                      {methods.formState.errors.linea.message}
                    </p>
                  )}
                </div>

                {/* UNIDADES DE NEGOCIO */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Unidad de negocio</p>
                  <Controller
                    control={methods.control}
                    name="uniNegocio"
                    rules={{
                      required: "La unidad de negocio es necesaria",
                    }}
                    render={({ field }) => (
                      <Combobox
                        items={unidadesNegocio}
                        value={field.value}
                        onValueChange={(value) =>
                          field.onChange(
                            unidadesNegocio.find((l) => l === value),
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
                                    Seleccione una unidad de negocio
                                  </p>
                                )}
                              </div>

                              <ChevronDown className="size-4" />
                            </Button>
                          }
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList className={"h-30"}>
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
                  {methods.formState.errors.uniNegocio && (
                    <p className="text-red-500">
                      {methods.formState.errors.uniNegocio.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 w-full h-fit">
                {/* SKU */}
                <div className="flex flex-col gap-2 w-full">
                  <p>SKU</p>
                  <Controller
                    name="sku"
                    control={methods.control}
                    rules={{
                      required: "El SKU es necesario",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type="text"
                        id="sku"
                        minLength={2}
                        maxLength={50}
                        placeholder="Ingrese el SKU"
                        className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                      />
                    )}
                  />
                  {methods.formState.errors.sku && (
                    <p className="text-red-500">
                      {methods.formState.errors.sku?.message}
                    </p>
                  )}
                </div>

                {/* UPC */}
                <div className="flex flex-col gap-2 w-full">
                  <p>UPC</p>
                  <Controller
                    name="upc"
                    control={methods.control}
                    rules={{
                      required: "El UPC es necesario",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type="text"
                        id="upc"
                        minLength={2}
                        maxLength={50}
                        placeholder="Ingrese el UPC"
                        className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                      />
                    )}
                  />
                  {methods.formState.errors.upc && (
                    <p className="text-red-500">
                      {methods.formState.errors.upc?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full h-fit">
                {/* TAMAÑO DE LA ORDEN */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Tamaño</p>
                  <Controller
                    name="sizeOrden"
                    control={methods.control}
                    rules={{ required: "El tamaño de la orden es necesario" }}
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
                        id="sizeOrden"
                        placeholder="1000"
                        min={1}
                        max={99}
                        className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                      />
                    )}
                  />
                  {methods.formState.errors.sizeOrden && (
                    <p className="text-red-500">
                      {methods.formState.errors.sizeOrden.message}
                    </p>
                  )}
                </div>

                {/* CANTIDAD INSPECCIONADA */}
                <div className="flex flex-col gap-2 w-full">
                  <p>Cant. inspeccionada</p>
                  <Controller
                    name="cantInspeccionada"
                    control={methods.control}
                    rules={{
                      required: "La cantidad inspeccionada es necesaria",
                    }}
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
                        id="cantInspeccionada"
                        placeholder="1000"
                        min={1}
                        max={99}
                        className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                      />
                    )}
                  />
                  {methods.formState.errors.cantInspeccionada && (
                    <p className="text-red-500">
                      {methods.formState.errors.cantInspeccionada.message}
                    </p>
                  )}
                </div>
              </div>
              {/* CANTIDAD ACEPTADA */}
              <div className="flex flex-col gap-2 w-full">
                <p>Cant. aceptada</p>
                <Controller
                  name="cantAceptada"
                  control={methods.control}
                  rules={{ required: "La cantidad aceptada es necesaria" }}
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
                      id="cantAceptada"
                      placeholder="1000"
                      min={1}
                      max={99}
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.cantAceptada && (
                  <p className="text-red-500">
                    {methods.formState.errors.cantAceptada.message}
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
              {/* COMENTARIOS */}
              <div className="flex flex-col gap-2">
                <p className="truncate">Comentarios (opcional)</p>
                <Controller
                  name="comentarios"
                  control={methods.control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <textarea
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      id="comentarios"
                      minLength={30}
                      maxLength={750}
                      placeholder="Ingrese comentarios extra"
                      className="w-full text-sm resize-none h-40 px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.comentarios && (
                  <p className="ml-1 text-red-500">
                    {methods.formState.errors.comentarios?.message}
                  </p>
                )}
              </div>

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
