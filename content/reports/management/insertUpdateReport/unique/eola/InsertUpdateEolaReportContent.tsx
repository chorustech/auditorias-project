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
import {
  insertEolaReport,
  selectEolaReportById,
} from "@/temp/Reports/Infrastructure/reportsController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { EolaFormValues } from "@/content/reports/types/reports/eolaFormValues";

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
    try {
      const endLoading = () => {
        setLoading(false);
      };

      if (isUpdate) {
        const fetchReport = async () => {
          const response = await selectEolaReportById(Number(id));

          if (response.ok) {
            methods.reset({
              id: response.report.id,
              numOrden: response.report.numOrden,
              usuario_id: usuario_temp.id,
              cantAceptada: response.report.cantAceptada,
              cantInspeccionada: response.report.cantInspeccionada,
              comentarios: response.report.comentarios,
              linea: response.report.linea,
              sizeOrden: response.report.sizeOrden,
              sku: response.report.sku,
              tipo: response.report.tipo,
              uniNegocio: response.report.uniNegocio,
              upc: response.report.upc,
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
        endLoading();
      }
    } catch (error) {
      console.log("Error", error);
    }
  }, [id, isUpdate, methods, router, setAnnouncement, usuario_temp.id]);

  const onSubmit = async (data: EolaFormValues) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("id", data.id.toString());
      formData.append("usuario_id", data.usuario_id.toString());
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
    } catch (error) {
      console.log("Error", error);
    }
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
