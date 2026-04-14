"use client";

/* COMPONENTS */
import { DinamicInsertUpdateUI } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUI";
import { BoxSkeleton } from "@/components/shared/boxSkeleton/BoxSkeleton";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicInputTextArea } from "@/components/shared/form/dinamicInput/DinamicInputTextArea";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";

/* ICONS */
import { Save } from "lucide-react";

/* LIBS */
import { motion } from "framer-motion";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTION */
import { guardarReporteAction } from "@/src/reporte-auditoria/infrastructure/actions/save";
import { getReporteByIdAction } from "@/src/reporte-auditoria/infrastructure/actions/get-by-id";
import { updateReporteAction } from "@/src/reporte-auditoria/infrastructure/actions/update";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { NcrFormValues } from "@/content/reports/types/forms/ncrFormValues";

/* UTILS */
import { getDate, getWeekNumber } from "@/utils/date";

import { getAllAreas } from "@/src/area/infrastructure/actions/get-all-areas";

type Area = {
  id: number;
  nombre: string;
  slug: string;
  encargado_email: string;
};

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
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState<Area[]>([]);

  const methods = useForm<NcrFormValues>();

  const usuario_temp = {
    id: 1,
    nombre: "Pirita Dreemurr",
    email: "pirita@assaabloy.com",
    rol: "administrador",
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);

      const areasResponse = await getAllAreas();
      if (areasResponse.ok) {
        setAreas(areasResponse.data);
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: "Error al cargar las áreas. Inténtalo de nuevo.",
        });
      }

      if (isUpdate) {
        const response = await getReporteByIdAction(Number(id));

        if (response.ok && response.data) {
          const report = response.data;
          if ('defecto' in report.metadata) {
            methods.reset({
              id: report.id,
              defecto: report.metadata.defecto,
              ncr: report.metadata.ncr,
              numParte: report.metadata.numParte,
              proveedor: report.metadata.proveedor,
              usuario_id: report.auditor_id,
            });
          }
        } else {
          setAnnouncement({
            isActivated: true,
            isOk: false,
            message: response.message,
          });
          router.push(`/reports/`);
        }
      } else {
        methods.reset({
          id: 0,
          ncr: "",
          numParte: "",
          proveedor: "",
          defecto: "",
          usuario_id: usuario_temp.id,
        });
      }
      setLoading(false);
    };

    fetchInitialData();
  }, [id, isUpdate, methods, router, setAnnouncement]);


  const onSubmit = async (data: NcrFormValues) => {
    setSaving(true);
    try {
      const area = areas.find((a) => a.slug === "ncr");
      const area_id = area?.id ?? 0;

      const archivo =
        data.archivo instanceof FileList ? data.archivo.item(0) : null;

      const buildFormData = () => {
        const formData = new FormData();
        if (archivo && archivo.size > 0) formData.append("archivo", archivo);
        formData.append(
          "data",
          JSON.stringify({
            slug: "ncr",
            area_id,
            auditor_id: usuario_temp.id,
            semana: Number(getWeekNumber()),
            respuestas: [],
            comentarios: null,
            metadata: {
              ncr: data.ncr,
              numParte: data.numParte,
              proveedor: data.proveedor,
              defecto: data.defecto,
            },
          }),
        );
        return formData;
      };

      let response;

      if (isUpdate) {
        response = await updateReporteAction(Number(id), buildFormData());
      } else {
        const result = await guardarReporteAction(buildFormData());
        response = { ok: result.success, message: result.message };
      }

      if (response.ok) {
        setAnnouncement({ isActivated: true, isOk: true, message: response.message });
        if (!isUpdate) methods.reset();
      } else {
        setAnnouncement({ isActivated: true, isOk: false, message: response.message });
      }
    } catch (error) {
      setAnnouncement({
        isActivated: true,
        isOk: false,
        message: "Ocurrió un error inesperado. Inténtalo de nuevo.",
      });
    } finally {
      setSaving(false);
    }
  };
  return (
    <FormProvider {...methods}>
      <DinamicInsertUpdateUI
        backAction={() => router.push("/reports/ncr")}
        headerRightContent={
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
        }
        leftTitle="Reporte NCR"
        rightTitle="Guardar"
        leftContent={
          loading ? (
            <BoxSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                {/* NCR */}
                <DinamicInputText<NcrFormValues>
                  name="ncr"
                  label="nro. NCR"
                  placeholder="Ingrese el número de NCR"
                  rules={{
                    required: "El número de NCR es necesario",
                    minLength: {
                      value: 2,
                      message:
                        "El número de NCR debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El número de NCR no puede tener más de 50 caracteres",
                    },
                  }}
                />

                {/* NÚMERO DE PARTE */}
                <DinamicInputText<NcrFormValues>
                  name="numParte"
                  label="nro. Parte"
                  placeholder="Ingrese el número de parte"
                  rules={{
                    required: "El número de parte es necesario",
                    minLength: {
                      value: 2,
                      message:
                        "El número de parte debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El número de parte no puede tener más de 50 caracteres",
                    },
                  }}
                />
              </div>

              {/* PROVEEDOR */}
              <DinamicInputText<NcrFormValues>
                name="proveedor"
                label="Proveedor"
                placeholder="Ingrese el proveedor"
                rules={{
                  required: "El proveedor es necesario",
                  minLength: {
                    value: 2,
                    message: "El proveedor debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "El proveedor no puede tener más de 50 caracteres",
                  },
                }}
              />

              {/* DEFECTO */}
              <DinamicInputTextArea<NcrFormValues>
                name="defecto"
                label="Defecto"
                placeholder="Ingrese el defecto del producto"
                rules={{
                  minLength: {
                    value: 2,
                    message:
                      "El defecto del producto debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 750,
                    message:
                      "El defecto del producto no puede tener más de 750 caracteres",
                  },
                }}
              />
            </motion.div>
          )
        }
        rightContent={
          loading ? (
            <BoxSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-full"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  {/* ARCHIVO */}
                  <div className="flex flex-col gap-2 h-full">
                    <p className="truncate">Adjuntar archivo</p>
                    <input
                      type="file"
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-sky-100 transition-all duration-300 placeholder:text-neutral-500 cursor-pointer"
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
                </div>

                {/* BOTÓN GUARDAR */}
                <div className="w-full sticky bottom-0 py-4 bg-white">
                  <DinamicBouncingButton
                    action={
                      saving || loading
                        ? () => { }
                        : methods.handleSubmit(onSubmit)
                    }
                    disabled={saving || loading ? true : false}
                    spin={saving || loading ? true : false}
                    text="Guardar"
                    Icon={Save}
                  />
                </div>
              </div>
            </motion.div>
          )
        }
      />
    </FormProvider>
  );
}
