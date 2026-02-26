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
import { insertNcrReport } from "@/temp/reports/insertNcrReport";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { NcrFormValues } from "@/content/reports/types/Report";

/* UTILS */
import { getDate, getWeekNumber } from "@/utils/date";

export function InsertUpdateNcrReportContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();
  const [saving, setSaving] = useState(false);

  const methods = useForm<NcrFormValues>({
    defaultValues: {
      ncr: "",
      numParte: "",
      proveedor: "",
      defecto: "",
    },
  });

  const onSubmit = async (data: NcrFormValues) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("ncr", data.ncr);
      formData.append("numParte", data.numParte);
      formData.append("proveedor", data.proveedor);
      formData.append("defecto", data.defecto);

      if (data.archivo instanceof FileList && data.archivo.length > 0) {
        formData.append("archivo", data.archivo.item(0)!);
      }

      const response = await insertNcrReport(formData);

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
          action={() => router.push("/reports/ncr")}
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
                <div className="flex flex-col gap-2 w-full">
                  {/* NCR */}
                  <p>Número NCR</p>
                  <Controller
                    name="ncr"
                    control={methods.control}
                    rules={{
                      required: "El número de NCR es necesario",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type="text"
                        id="ncr"
                        minLength={2}
                        maxLength={50}
                        placeholder="Ingrese el número de NCR"
                        className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                      />
                    )}
                  />
                  {methods.formState.errors.ncr && (
                    <p className="text-red-500">
                      {methods.formState.errors.ncr?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  {/* NÚMERO DE PARTE */}
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
              </div>
              {/* PROVEEDOR */}
              <div className="flex flex-col gap-2 w-full">
                <p>Proveedor</p>
                <Controller
                  name="proveedor"
                  control={methods.control}
                  rules={{
                    required: "El proveedor es necesario",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      type="text"
                      id="proveedor"
                      minLength={2}
                      maxLength={50}
                      placeholder="Ingrese el proveedor"
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.proveedor && (
                  <p className="text-red-500">
                    {methods.formState.errors.proveedor?.message}
                  </p>
                )}
              </div>

              {/* DEFECTO */}
              <div className="flex flex-col gap-2">
                <p>Defecto</p>
                <Controller
                  name="defecto"
                  control={methods.control}
                  rules={{
                    required: "El defecto es necesario",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <textarea
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      id="defecto"
                      minLength={30}
                      maxLength={750}
                      placeholder="Ingrese el defecto del producto"
                      className="w-full text-sm resize-none h-40 px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.defecto && (
                  <p className="ml-1 text-red-500">
                    {methods.formState.errors.defecto?.message}
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
                <p className="truncate">Adjuntar archivo</p>
                <input
                  type="file"
                  className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-[#d9f2f9] transition-all duration-300 placeholder:text-neutral-500 cursor-pointer"
                  {...methods.register("archivo", {
                    required: "Archivo requerido",
                    validate: (value) => {
                      if (!(value instanceof FileList)) {
                        return "Archivo requerido";
                      }

                      const file = value.item(0);
                      if (!file) return "Archivo requerido";
                      if (file.size > 5_000_000) return "Máx 5MB";

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
