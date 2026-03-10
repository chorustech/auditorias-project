"use client";

/* COMPONENTS */
import { DinamicInsertUpdateUI } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUI";
import { BoxSkeleton } from "@/components/shared/boxSkeleton/BoxSkeleton";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicCombobox } from "@/components/shared/form/dinamicInput/DinamicCombobox";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";

/* DATA */
import {
  estados,
  roles,
} from "@/content/users/data/comboboxItems/comboboxItems";

/* HOOKS */
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

/* ICONS */
import { Save } from "lucide-react";

/* LIBS */
import { motion } from "framer-motion";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTIONS */
import {
  insertUser,
  selectUserById,
} from "@/temp/Users/Infrastructure/usersController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { UserFormValues } from "@/content/users/types/forms/UserFormValues";

/* UTILS */
import { getDate, getWeekNumber } from "@/utils/date";
import { DinamicInputNumber } from "@/components/shared/form/dinamicInput/DinamicInputNumber";

export function InsertUpdateUserContent({
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

  const methods = useForm<UserFormValues>();

  useEffect(() => {
    try {
      const endLoading = () => {
        setLoading(false);
      };

      if (isUpdate) {
        const fetchUser = async () => {
          const response = await selectUserById(Number(id));

          if (response.ok) {
            methods.reset({
              id: response.user.id,
              email: response.user.email,
              nombre: response.user.nombre,
              numEmpleado: response.user.numEmpleado,
              rol: response.user.rol,
              estado: response.user.estado,
            });
            endLoading();
          } else {
            setAnnouncement({
              isActivated: true,
              isOk: false,
              message: response.message,
            });

            router.push(`/users/`);
          }
        };

        fetchUser();
      } else {
        methods.reset({
          id: 0,
          email: "",
          nombre: "",
          numEmpleado: 0,
          rol: "",
          estado: "",
        });
        endLoading();
      }
    } catch (error) {
      console.log("Error", error);
    }
  }, [id, isUpdate, methods, router, setAnnouncement]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("id", data.id.toString());
      formData.append("email", data.email);
      formData.append("nombre", data.nombre);
      formData.append("numEmpleado", data.numEmpleado.toString());
      formData.append("rol", data.rol);
      formData.append("estado", data.estado);

      const response = await insertUser(formData);

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
        backAction={() => router.push("/users/")}
        headerRightContent={
          <div className="flex gap-4">
            <p>
              Fecha: <span className="text-[#00A0D0]">{getDate()}</span>
            </p>
            <p>
              Semana: <span className="text-[#00A0D0]">{getWeekNumber()}</span>
            </p>
          </div>
        }
        leftTitle="Datos del usuario"
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
              {/* NÚMERO DE EMPLEADO */}
              <DinamicInputNumber<UserFormValues>
                name="numEmpleado"
                label="nro. Empleado"
                placeholder="Ingrese el número de empleado"
                min={1}
                max={99}
                rules={{
                  required: "El número de empleado es necesario",
                }}
              />

              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                {/* NOMBRE */}
                <DinamicInputText<UserFormValues>
                  name="nombre"
                  label="Nombre"
                  placeholder="Ingrese el nombre de empleado"
                  rules={{
                    required: "El nombre de empleado es necesario",
                    minLength: {
                      value: 2,
                      message:
                        "El nombre de empleado debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El nombre de empleado no puede tener más de 50 caracteres",
                    },
                  }}
                />

                {/* CORREO */}
                <DinamicInputText<UserFormValues>
                  name="email"
                  label="Correo"
                  placeholder="Ingrese el correo de empleado"
                  rules={{
                    required: "El correo de empleado es necesario",
                    minLength: {
                      value: 2,
                      message:
                        "El correo de empleado debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El correo de empleado no puede tener más de 50 caracteres",
                    },
                  }}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                {/* ROL */}
                <DinamicCombobox<UserFormValues>
                  name="rol"
                  label="Rol"
                  items={roles}
                  placeholder="Seleccionar rol"
                  rules={{
                    required: "El rol es necesario",
                  }}
                />

                {/* ESTADO */}
                <DinamicCombobox<UserFormValues>
                  name="estado"
                  label="Estado"
                  items={estados}
                  placeholder="Seleccionar estado"
                  rules={{
                    required: "El estado es necesario",
                  }}
                />
              </div>
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
                <div></div>
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
