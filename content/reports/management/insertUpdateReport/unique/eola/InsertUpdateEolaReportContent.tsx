"use client";

/* COMPONENTS */
import { DinamicInsertUpdateUI } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUI";
import { BoxSkeleton } from "@/components/shared/boxSkeleton/BoxSkeleton";
import { DinamicCombobox } from "@/components/shared/form/dinamicInput/DinamicCombobox";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicInputNumber } from "@/components/shared/form/dinamicInput/DinamicInputNumber";
import { DinamicInputTextArea } from "@/components/shared/form/dinamicInput/DinamicInputTextArea";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";

/* DATA */
import {
  lineas,
  tipoEolaReport,
} from "@/content/reports/data/comboboxItems/comboboxItems";

/* HOOKS */
import { useForm, FormProvider, useWatch } from "react-hook-form";
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
import { EolaFormValues } from "@/content/reports/types/forms/eolaFormValues";

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
  const [loading, setLoading] = useState(true);

  const methods = useForm<EolaFormValues>({ defaultValues: { tipo: "" } });
  const isEola = useWatch({
    control: methods.control,
    name: "tipo",
    defaultValue: "",
  });

  const usuario_temp = {
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
          // Type guard to ensure we have the correct metadata type
          if ('numOrden' in report.metadata) {
            methods.reset({
              id: report.id,
              numOrden: report.metadata.numOrden,
              usuario_id: usuario_temp.id,
              cantAceptada: report.metadata.cantAceptada,
              cantInspeccionada: report.metadata.cantInspeccionada,
              comentarios: report.comentarios || '',
              linea: report.metadata.linea,
              sizeOrden: report.metadata.sizeOrden,
              sku: report.metadata.sku,
              tipo: report.metadata.tipo,
              uniNegocio: report.metadata.uniNegocio,
              upc: report.metadata.upc,
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
        setLoading(false);
      } else {
        methods.reset({
          id: 0,
          numOrden: "",
          usuario_id: usuario_temp.id,
          cantAceptada: 1,
          cantInspeccionada: 1,
          comentarios: "",
          linea: "",
          sizeOrden: 1,
          sku: "",
          tipo: "EOLA",
          uniNegocio: "",
          upc: "",
        });
        setLoading(false);
      }
    };

    fetchReport();
  }, [id, isUpdate, methods, router, setAnnouncement]);

  const onSubmit = async (data: EolaFormValues) => {
    setSaving(true);

    const reportData = {
      slug: 'eola',
      data: {
        auditor_id: data.usuario_id,
        semana: Number(getWeekNumber()), // Ensure semana is a number
        respuestas: [],
        comentarios: data.comentarios,
      },
      metadata: {
        numOrden: data.numOrden,
        cantAceptada: data.cantAceptada,
        cantInspeccionada: data.cantInspeccionada,
        linea: data.linea,
        sizeOrden: data.sizeOrden,
        sku: data.sku,
        tipo: data.tipo,
        uniNegocio: data.uniNegocio,
        upc: data.upc,
      },
    };

    const response = isUpdate
      ? await updateReporteAction(Number(id), reportData, 'eola')
      : await guardarReporteAction({
          ...reportData,
          slug: 'eola',
          auditor_id: data.usuario_id,
          semana: getWeekNumber().toString(),
          respuestas: [], // Changed to an empty array
        });

    if ('ok' in response && response.ok) {
      setAnnouncement({
        isActivated: true,
        isOk: true,
        message: response.message,
      });

      if (!isUpdate) methods.reset();
    } else if ('success' in response && response.success) {
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
        backAction={() => router.push("/reports/eola")}
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
        leftTitle="Reporte EOLA"
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
                {/* TIPO */}
                <DinamicCombobox<EolaFormValues>
                  name="tipo"
                  label="Tipo"
                  items={tipoEolaReport}
                  placeholder="Seleccionar un tipo"
                  rules={{
                    required: "El tipo es necesario",
                  }}
                />

                {/* NÚMERO DE ORDEN EOLA */}
                {isEola === "EOLA" && (
                  <DinamicInputText<EolaFormValues>
                    name="numOrden"
                    label="nro. EOLA"
                    placeholder="Ingrese el número de orden"
                    rules={{
                      required: "El número de orden es necesario",
                      minLength: {
                        value: 2,
                        message:
                          "El número de orden debe tener al menos 2 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "El número de orden no puede tener más de 50 caracteres",
                      },
                    }}
                  />
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                {/* LINEAS */}
                <DinamicCombobox<EolaFormValues>
                  name="linea"
                  label="Línea"
                  items={lineas}
                  placeholder="Seleccionar línea"
                  rules={{
                    required: "La línea es necesaria",
                  }}
                />

                {/* UNIDADES DE NEGOCIO */}
                <DinamicCombobox<EolaFormValues>
                  name="uniNegocio"
                  label="Unidad de negocio"
                  items={lineas}
                  placeholder="Seleccionar unidad de negocio"
                  rules={{
                    required: "La unidad de negocio es necesaria",
                  }}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                {/* SKU */}
                <DinamicInputText<EolaFormValues>
                  name="sku"
                  label="SKU"
                  placeholder="Ingrese el SKU de orden"
                  rules={{
                    required: "El SKU es necesario",
                    minLength: {
                      value: 2,
                      message: "El SKU debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message: "El SKU no puede tener más de 50 caracteres",
                    },
                  }}
                />

                {/* UPC */}
                <DinamicInputText<EolaFormValues>
                  name="upc"
                  label="UPC"
                  placeholder="Ingrese el UPC de orden"
                  rules={{
                    required: "El UPC es necesario",
                    minLength: {
                      value: 2,
                      message: "El UPC debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message: "El UPC no puede tener más de 50 caracteres",
                    },
                  }}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                {/* TAMAÑO DE LA ORDEN */}
                <DinamicInputNumber<EolaFormValues>
                  name="sizeOrden"
                  label="Tamaño"
                  placeholder="Ingrese el tamaño de orden"
                  min={1}
                  max={99}
                  rules={{
                    required: "El tamaño de orden es necesario",
                  }}
                />

                {/* CANTIDAD INSPECCIONADA */}
                <DinamicInputNumber<EolaFormValues>
                  name="cantInspeccionada"
                  label="Cant. Inspeccionada"
                  placeholder="Ingrese la cantidad inspeccionada"
                  min={1}
                  max={99}
                  rules={{
                    required: "La cantidad inspeccionada es necesaria",
                  }}
                />
              </div>

              {/* CANTIDAD ACEPTADA */}
              <DinamicInputNumber<EolaFormValues>
                name="cantAceptada"
                label="Cant. Aceptada"
                placeholder="Ingrese la cantidad aceptada"
                min={1}
                max={99}
                rules={{
                  required: "La cantidad aceptada es necesaria",
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
                  {/* COMENTARIOS */}
                  <DinamicInputTextArea<EolaFormValues>
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
