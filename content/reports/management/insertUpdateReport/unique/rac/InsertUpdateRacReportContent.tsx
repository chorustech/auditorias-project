"use client";

/* COMPONENTS */
import { DinamicInsertUpdateUI } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUI";
import { BoxSkeleton } from "@/components/shared/boxSkeleton/BoxSkeleton";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicCombobox } from "@/components/shared/form/dinamicInput/DinamicCombobox";
import { DinamicInputNumber } from "@/components/shared/form/dinamicInput/DinamicInputNumber";
import { DinamicInputTextArea } from "@/components/shared/form/dinamicInput/DinamicInputTextArea";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";

/* DATA */
import {
  descripcionesProd,
  ponderancias,
  areas,
  estados,
  porcentajesFalla,
} from "@/content/reports/data/comboboxItems/comboboxItems";

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
import {
  insertRacReport,
  selectRacReportById,
} from "@/temp/Reports/Infrastructure/reportsController";

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
  const [loading, setLoading] = useState(true);

  const methods = useForm<RacFormValues>();

  const usuario_temp = {
    id: 1,
    nombre: "Pirita Dreemurr",
    email: "pirita@assaabloy.com",
    rol: "administrador",
  };

  useEffect(() => {
    try {
      const endLoading = () => {
        setLoading(false);
      };

      if (isUpdate) {
        const fetchReport = async () => {
          const response = await selectRacReportById(Number(id));

          if (response.ok) {
            methods.reset({
              id: response.report.id,
              area: response.report.area,
              codigoFecha: response.report.codigoFecha,
              descProb: response.report.descProb,
              descProd: response.report.descProd,
              estado: response.report.estado,
              numParte: response.report.numParte,
              ponderancia: response.report.ponderancia,
              porcFalla: response.report.porcFalla,
              responsable: response.report.responsable,
              sizeLote: response.report.sizeLote,
              usuario_id: response.report.usuario_id,
            });
            endLoading();
          } else {
            setAnnouncement({
              isActivated: true,
              isOk: false,
              message: response.message,
            });

            router.push(`/reports/`);
          }
        };

        fetchReport();
      } else {
        methods.reset({
          id: 0,
          area: "",
          codigoFecha: "",
          descProb: "",
          descProd: "",
          estado: "",
          numParte: "",
          ponderancia: "",
          porcFalla: "",
          responsable: "",
          sizeLote: 0,
          usuario_id: usuario_temp.id,
        });
        endLoading();
      }
    } catch (error) {
      console.log("Error", error);
    }
  }, [id, isUpdate, methods, router, setAnnouncement]);

  const onSubmit = async (data: RacFormValues) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("id", data.id.toString());
      formData.append("usuario_id", data.usuario_id.toString());
      formData.append("estado", data.estado);
      formData.append("responsable", data.responsable);
      formData.append("numParte", data.numParte);
      formData.append("descProd", data.descProd);
      formData.append("sizeLote", data.sizeLote.toString());
      formData.append("ponderancia", data.ponderancia);
      formData.append("codigoFecha", data.codigoFecha);
      formData.append("area", data.area);
      formData.append("porcFalla", data.porcFalla.toString());
      formData.append("descProb", data.descProb);

      if (data.archivo instanceof FileList && data.archivo.length > 0) {
        formData.append("archivo", data.archivo.item(0)!);
      }

      const response = await insertRacReport(formData);

      if (response.ok) {
        setAnnouncement({
          isActivated: true,
          isOk: true,
          message: response.message,
        });
        console.log(data);

        if (!isUpdate) methods.reset();
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
      }

      setSaving(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <DinamicInsertUpdateUI
        backAction={() => router.push("/reports/rac")}
        headerRightContent={
          <div className="flex gap-4">
            <p>
              Abierto por:{" "}
              <span className="text-[#00A0D0]">Pirita Dreemurr</span>
            </p>
            <p>
              Fecha: <span className="text-[#00A0D0]">{getDate()}</span>
            </p>
            <p>
              Semana: <span className="text-[#00A0D0]">{getWeekNumber()}</span>
            </p>
          </div>
        }
        leftTitle="Reporte RAC"
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
                {/* RESPONSABLE */}
                <DinamicInputText<RacFormValues>
                  name="responsable"
                  label="Responsable del área"
                  placeholder="Ingrese el responsable del área"
                  rules={{
                    required: "El responsable del área es necesario",
                    minLength: {
                      value: 2,
                      message:
                        "El responsable del área debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El responsable del área no puede tener más de 50 caracteres",
                    },
                  }}
                />

                {/* ESTADO */}
                <DinamicCombobox<RacFormValues>
                  name="estado"
                  label="Estado"
                  items={estados}
                  placeholder="Seleccionar un estado"
                  rules={{
                    required: "El estado es necesario",
                  }}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                {/* NÚMERO DE PARTE */}
                <DinamicInputText<RacFormValues>
                  name="numParte"
                  label="Número de parte"
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

                {/* DESCRIPCIÓN DE PRODUCTO */}
                <DinamicCombobox<RacFormValues>
                  name="descProd"
                  label="Descripción prod."
                  items={descripcionesProd}
                  placeholder="Seleccionar una descripción"
                  rules={{
                    required: "La descripción es necesaria",
                  }}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                {/* TAMAÑO DE LOTE */}
                <DinamicInputNumber<RacFormValues>
                  name="sizeLote"
                  label="Tamaño"
                  placeholder="Ingrese el tamaño de lote"
                  min={1}
                  max={99}
                  rules={{
                    required: "El tamaño de lote es necesario",
                  }}
                />

                {/* PONDERANCIA */}
                <DinamicCombobox<RacFormValues>
                  name="ponderancia"
                  label="Ponderancia"
                  items={ponderancias}
                  placeholder="Seleccionar una ponderancia"
                  rules={{
                    required: "La ponderancia es necesaria",
                  }}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                {/* CÓDIGO DE FECHA */}
                <DinamicInputText<RacFormValues>
                  name="codigoFecha"
                  label="Código de fecha (Opcional)"
                  placeholder="Ingrese el código de fecha"
                  rules={{
                    required: "El código de fecha es necesario",
                    minLength: {
                      value: 2,
                      message:
                        "El código de fecha debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El código de fecha no puede tener más de 50 caracteres",
                    },
                  }}
                />

                {/* ÁREA */}
                <DinamicCombobox<RacFormValues>
                  name="area"
                  label="Área"
                  items={areas}
                  placeholder="Seleccionar un área"
                  rules={{
                    required: "El área es necesaria",
                  }}
                />
              </div>

              {/* PORCENTAJE DE FALLA */}
              <DinamicCombobox<RacFormValues>
                name="porcFalla"
                label="Porcentaje de falla"
                items={porcentajesFalla}
                placeholder="Seleccionar un porcentaje de falla"
                rules={{
                  required: "El porcentaje de falla es necesaria",
                }}
              />

              {/* DESCRIPCIÓN DEL PROBLEMA */}
              <DinamicInputTextArea<RacFormValues>
                name="descProb"
                label="Desc. Problema"
                placeholder="Ingrese la descripción del problema"
                rules={{
                  minLength: {
                    value: 2,
                    message:
                      "La descripción del problema debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 750,
                    message:
                      "La descripción del problema no puede tener más de 750 caracteres",
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
                    <p className="truncate">Adjuntar archivo (opcional)</p>
                    <input
                      type="file"
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-sky-100 transition-all duration-300 placeholder:text-neutral-500 cursor-pointer"
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
                </div>

                {/* BOTÓN GUARDAR */}
                <div className="w-full sticky bottom-0 py-4 bg-white">
                  <DinamicBouncingButton
                    action={
                      saving || loading
                        ? () => {}
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
