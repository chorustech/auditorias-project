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
import { getSessionUser } from "@/src/shared/infrastructure/utils/get-session-user";

/* ICONS */
import { Save } from "lucide-react";

/* NAVIGATION */
import { usePathname, useRouter } from "next/navigation";

/* SERVER ACTION */
import { createReportAction } from "@/src/reporte-auditoria/infrastructure/actions/create-report";
import { getReporteByIdAction } from "@/src/reporte-auditoria/infrastructure/actions/get-by-id";
import { updateReporteAction } from "@/src/reporte-auditoria/infrastructure/actions/update";
import { logoutAction } from "@/src/shared/infrastructure/utils/logout-action";
import { getAllAreas } from "@/src/area/infrastructure/actions/get-all-areas";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { ReportFormValues } from "@/content/reports/types/forms/reportFormValues";
import { UserPrimitive } from "@/src/users";

// Defining Area type locally based on DB schema
type Area = {
  id: number;
  nombre: string;
  slug: string;
  encargado_email: string;
};

/* UTILS */
import { getDate, getWeekNumber } from "@/utils/date";

/* LIBS */
import { motion } from "framer-motion";

const createReport = async (
  data: ReportFormValues,
  user: UserPrimitive,
  path: string,
  areas: Area[],
) => {
  const area = areas.find((a) => a.slug === path);
  const area_id = area ? area.id : 0;
  console.log("Debug: Correct area_id to save:", area_id, "from slug:", path);

  const es_negativo =
    data.respuestas.filter((r) => r).length < data.respuestas.length / 2;

  let metadata: any = {};
  switch (path) {
    case "pizza-tray":
      metadata = { nivel: data.nivel, ubicacion: data.ubicacion };
      break;
    case "baldwin-state":
      metadata = { coordinador: data.coord, linea: data.linea };
      break;
    case "baldwin-reserve-supply":
      metadata = { picker: data.picker };
      break;
    case "display-area":
      metadata = { worktable: data.worktable };
      break;
    case "baldwin-reserve-stacking":
    case "baldwin-reserve-packing":
    case "baldwin-reserve-general":
      metadata = { linea: data.linea };
      break;
  }

  const reportData = {
    area_id,
    semana: Number(getWeekNumber()),
    respuestas: data.respuestas,
    comentarios: data.comentarios,
    metadata,
    es_negativo,
  };

  console.log("Debug: reportData to send:", reportData);
  return await createReportAction(reportData as any);
};

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
  const [areas, setAreas] = useState<Area[]>([]);
  const [user, setUser] = useState<UserPrimitive | null>(null);

  const methods = useForm<ReportFormValues>();

  const path = pathname.split("/")[2] ?? null;

  useEffect(() => {
    console.log("Debug: Pathname changed:", pathname);
    console.log("Debug: Extracted path:", path);
  }, [pathname, path]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);

      const sessionUser = await getSessionUser();
      if (!sessionUser) {
        await logoutAction();
        router.push("/");
        return;
      }
      setUser(sessionUser);

      const areasResponse = await getAllAreas();
      if (areasResponse.ok) {
        console.log("Debug: Areas loaded from DB:", areasResponse.data);
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
          const { data: report } = response;
          const { metadata } = report;
          const resetData: any = {
            comentarios: report.comentarios || "",
            respuestas: report.respuestas,
          };

          if (metadata && typeof metadata === 'object') {
            if ("nivel" in metadata) resetData.nivel = Number((metadata as any).nivel);
            if ("ubicacion" in metadata) resetData.ubicacion = (metadata as any).ubicacion;
            if ("coordinador" in metadata) resetData.coord = (metadata as any).coordinador;
            if ("linea" in metadata) resetData.linea = (metadata as any).linea;
            if ("picker" in metadata) resetData.picker = (metadata as any).picker;
            if ("worktable" in metadata) resetData.worktable = (metadata as any).worktable;
          }
          methods.reset(resetData);
        } else {
          setAnnouncement({ isActivated: true, isOk: false, message: response.message });
          router.push(`/reports/`);
        }
      } else {
        methods.reset({
          linea: "", coord: "", picker: "", ubicacion: "", worktable: "",
          nivel: 1, comentarios: "", respuestas: [],
        });
      }
      setLoading(false);
    };

    fetchInitialData();
  }, [id, isUpdate, router, setAnnouncement, methods]);

  const onSubmit = async (data: ReportFormValues) => {
    setSaving(true);
    try {
      if (!user || !path) {
        setAnnouncement({ isActivated: true, isOk: false, message: "Error de sesión. Por favor, vuelve a iniciar sesión." });
        setSaving(false);
        return;
      }

      let response;
      if (isUpdate) {
        // ... update logic
      } else {
        response = await createReport(data, user, path, areas);
      }

      if (response && response.ok) {
        setAnnouncement({ isActivated: true, isOk: true, message: response.message });
        if (!isUpdate) methods.reset();
      } else if (response) {
        setAnnouncement({ isActivated: true, isOk: false, message: response.message });
      }
    } catch (error) {
      setAnnouncement({ isActivated: true, isOk: false, message: "Ocurrió un error inesperado. Inténtalo de nuevo." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <DinamicInsertUpdateUI
        backAction={() => router.push(`/reports/${path}`)}
        headerRightContent={
          <div className="flex gap-4">
            <p>
              Auditor: <span className="text-[#00A0D0]">{user?.nombre}</span>
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

                  <div className="flex flex-col gap-2">
                    <p className="truncate">Adjuntar archivo (opcional)</p>
                    <input
                      type="file"
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-sky-100 transition-all duration-300 placeholder:text-neutral-500 cursor-pointer"
                      {...methods.register("archivo", {
                        validate: (value) => {
                          if (value instanceof FileList) {
                            const file = value.item(0);

                            if (file) {
                              if (file.size > 5_000_000)
                                return "El archivo debe pesar menos de 5MB";
                            }
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
