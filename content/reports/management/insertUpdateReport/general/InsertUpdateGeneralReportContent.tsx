"use client";

/* COMPONENTS */
import { GeneralQuestions } from "@/content/reports/management/insertUpdateReport/general/generalQuestions/GeneralQuestions";
import { DinamicCombobox } from "@/components/shared/form/dinamicInput/DinamicCombobox";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicInputNumber } from "@/components/shared/form/dinamicInput/DinamicInputNumber";
import { DinamicInputTextArea } from "@/components/shared/form/dinamicInput/DinamicInputTextArea";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";
import { DinamicInsertUpdateUI } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUI";
import { BoxSkeleton } from "@/components/shared/boxSkeleton/BoxSkeleton";

/* DATA */
import {
  lineas,
  worktables,
} from "@/content/reports/data/comboboxItems/comboboxItems";
import { reportsQuestions } from "@/content/reports/data/questions/reportsQuestions";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";

/* ICONS */
import { Save } from "lucide-react";

/* NAVIGATION */
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

/* SERVER ACTION */
import { guardarReporteAction } from "@/src/reporte-auditoria/infrastructure/actions/save";
import { getReporteByIdAction } from "@/src/reporte-auditoria/infrastructure/actions/get-by-id";
import { updateReporteAction } from "@/src/reporte-auditoria/infrastructure/actions/update";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { ReportFormValues } from "@/content/reports/types/reports/reportFormValues";

/* UTILS */
import { getDate, getWeekNumber } from "@/utils/date";
import { isPointerArea } from "@/utils/pointerArea";

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
  const [loading, setLoading] = useState(true);

  const rawPath = pathname.split("/").at(isUpdate ? -3 : -2);
  const path = rawPath ?? null;

  const methods = useForm<ReportFormValues>();

  const auditor_temp = {
    id: 1,
    nombre: "Pirita Dreemurr",
    email: "pirita@assaabloy.com",
    rol: "administrador",
  };

  useEffect(() => {
    const fetchReport = async () => {
      if (isUpdate) {
        setLoading(true);
        const response = await getReporteByIdAction(Number(id));

        if (response.ok && response.data) {
          const report = response.data;
          const metadata = report.metadata;
          let resetData: any = {
            comentarios: report.comentarios || '',
            respuestas: report.respuestas,
            auditor_id: report.auditor_id,
          };

          if ('nivel' in metadata) { // PizzaTrayMetadata
            resetData.ubicacion = metadata.ubicacion;
            resetData.nivel = Number(metadata.nivel);
          } else if ('coordinador' in metadata) { // BaldwinStateMetadata
            resetData.linea = metadata.linea;
            resetData.coord = metadata.coordinador;
          } else if ('picker' in metadata) { // SurtidoMaterialesMetadata
            resetData.picker = metadata.picker;
          } else if ('worktable' in metadata) { // DisplayAreaMetadata
            resetData.worktable = metadata.worktable;
          } else if ('linea' in metadata) { // Stacking, Packing, General (baldwin-reserve)
            resetData.linea = metadata.linea;
          }
          methods.reset(resetData);
        } else {
          setAnnouncement({
            isActivated: true,
            isOk: false,
            message: response.message,
          });
          router.push(`/reports/`);
        }
        setLoading(false);
      } else {
        methods.reset({
          linea: "",
          coord: "",
          picker: "",
          ubicacion: "",
          worktable: "",
          nivel: 1,
          comentarios: "",
          respuestas: [],
          auditor_id: auditor_temp.id,
        });
        setLoading(false);
      }
    };

    fetchReport();
  }, [id, isUpdate, methods, router, setAnnouncement]);

  const onSubmit = async (data: ReportFormValues) => {
    setSaving(true);

    let metadata: any = {};
    switch (path) {
      case 'pizza-tray':
        metadata = { nivel: data.nivel, ubicacion: data.ubicacion };
        break;
      case 'baldwin-state':
        metadata = { coordinador: data.coord, linea: data.linea };
        break;
      case 'baldwin-reserve-supply':
        metadata = { picker: data.picker };
        break;
      case 'display-area':
        metadata = { worktable: data.worktable };
        break;
      case 'baldwin-reserve-stacking':
      case 'baldwin-reserve-packing':
      case 'baldwin-reserve-general':
        metadata = { linea: data.linea };
        break;
    }

    let response;

    if (isUpdate) {
      const reportData = {
        data: {
          auditor_id: data.auditor_id,
          semana: Number(getWeekNumber()),
          respuestas: data.respuestas,
          comentarios: data.comentarios,
        },
        metadata,
      };
      response = await updateReporteAction(Number(id), reportData, path || '');
    } else {
      const reportData = {
        slug: path || '',
        auditor_id: data.auditor_id,
        semana: getWeekNumber().toString(),
        respuestas: data.respuestas,
        comentarios: data.comentarios,
        metadata: metadata
      };
      response = await guardarReporteAction(reportData);
    }

    if (('ok' in response && response.ok) || ('success' in response && response.success)) {
      setAnnouncement({
        isActivated: true,
        isOk: true,
        message: response.message,
      });

      if (!isUpdate) methods.reset();
    } else {
      setAnnouncement({
        isActivated: true,
        isOk: false,
        message: response.message,
      });
    }

    setSaving(false);
  };

  return (
    <FormProvider {...methods}>
      <DinamicInsertUpdateUI
        backAction={() => router.push(`/reports/${path}`)}
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
        leftTitle="Preguntas de auditoría"
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
              <GeneralQuestions
                sections={reportsQuestions[path ?? ""].sections}
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
                  {/* LINEAS */}
                  {(path === "baldwin-state" ||
                    path === "baldwin-reserve-stacking" ||
                    path === "baldwin-reserve-packing" ||
                    path === "baldwin-reserve-general") && (
                    <DinamicCombobox<ReportFormValues>
                      name="linea"
                      label="Línea"
                      items={lineas}
                      placeholder="Seleccionar línea"
                      rules={{
                        required: "La línea es necesaria",
                      }}
                    />
                  )}

                  {/* COORDINADOR */}
                  {path === "baldwin-state" && (
                    <DinamicInputText<ReportFormValues>
                      name="coord"
                      label="Coordinador"
                      placeholder="Ingrese el nombre del coordinador"
                      rules={{
                        required: "El nombre del coordinador es necesario",
                        minLength: {
                          value: 2,
                          message:
                            "El nombre del coordinador debe tener al menos 2 caracteres",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "El nombre del coordinador no puede tener más de 50 caracteres",
                        },
                      }}
                    />
                  )}

                  {/* PICKER */}
                  {path === "baldwin-reserve-supply" && (
                    <DinamicInputText<ReportFormValues>
                      name="picker"
                      label="Picker"
                      placeholder="Ingrese el nombre del picker"
                      rules={{
                        required: "El nombre del picker es necesario",
                        minLength: {
                          value: 2,
                          message:
                            "El nombre del picker debe tener al menos 2 caracteres",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "El nombre del picker no puede tener más de 50 caracteres",
                        },
                      }}
                    />
                  )}

                  {/* UBICACIÓN */}
                  {path === "pizza-tray" && (
                    <DinamicInputText<ReportFormValues>
                      name="ubicacion"
                      label="Ubicación"
                      placeholder="Ingrese el nombre de ubicación"
                      rules={{
                        required: "El nombre de ubicación es necesario",
                        minLength: {
                          value: 2,
                          message:
                            "El nombre de ubicación debe tener al menos 2 caracteres",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "El nombre de ubicación no puede tener más de 50 caracteres",
                        },
                      }}
                    />
                  )}

                  {/* WORKTABLES */}
                  {path === "display-area" && (
                    <DinamicCombobox<ReportFormValues>
                      name="worktable"
                      label="Worktable"
                      items={worktables}
                      placeholder="Seleccionar worktable"
                      rules={{
                        required: "La worktable es necesaria",
                      }}
                    />
                  )}

                  {/* NIVEL */}
                  {path === "pizza-tray" && (
                    <DinamicInputNumber<ReportFormValues>
                      name="nivel"
                      label="Nivel"
                      placeholder="Ingrese el nivel"
                      min={1}
                      max={99}
                      rules={{
                        required: "El nivel es necesario",
                      }}
                    />
                  )}

                  {/* COMENTARIOS */}
                  <DinamicInputTextArea<ReportFormValues>
                    name="comentarios"
                    label="Comentarios"
                    placeholder="Ingrese comentarios extra"
                    rules={{
                      minLength: {
                        value: 2,
                        message:
                          "La descripción debe tener al menos 2 caracteres",
                      },
                      maxLength: {
                        value: 750,
                        message:
                          "La descripción no puede tener más de 750 caracteres",
                      },
                    }}
                  />

                  {/* ARCHIVO */}
                  <div className="flex flex-col gap-2">
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
