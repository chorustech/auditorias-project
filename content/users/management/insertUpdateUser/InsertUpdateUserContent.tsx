"use client";

/* COMPONENTS */
import { DinamicInsertUpdateUI } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUI";
import { BoxSkeleton } from "@/components/shared/boxSkeleton/BoxSkeleton";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicCombobox } from "@/components/shared/form/dinamicInput/DinamicCombobox";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";
import { DinamicInputNumber } from "@/components/shared/form/dinamicInput/DinamicInputNumber";

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
import { getUserByIdAction } from "@/src/users/infrastructure/actions/get-user-by-id";
import { updateUserAction } from "@/src/users/infrastructure/actions/update-user";
import { insertUser } from "@/src/users/actions/create-action";


/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { UserFormValues } from "@/content/users/types/forms/userFormValues";

/* UTILS */
import { getDate, getWeekNumber } from "@/utils/date";
import { Roles } from "@/db/schemas/usuario";

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
    const fetchUser = async () => {
      if (isUpdate) {
        const response = await getUserByIdAction(Number(id));

        if (response.ok && response.data) {
          methods.reset({
            id: response.data.id,
            email: response.data.email,
            nombre: response.data.nombre,
            numEmpleado: response.data.numEmpleado,
            rol: response.data.rol,
            estado: response.data.estado ? "Activo" : "Inactivo",
          });
        } else {
          setAnnouncement({
            isActivated: true,
            isOk: false,
            message: response.message,
          });
          router.push(`/users/`);
        }
      } else {
        methods.reset({
          id: 0,
          email: "",
          nombre: "",
          numEmpleado: 0,
          rol: "auditor",
          estado: "Activo",
        });
      }
      setLoading(false);
    };

    fetchUser();
  }, [id, isUpdate, methods, router, setAnnouncement]);

  const onSubmit = async (data: UserFormValues) => {
    setSaving(true);
    let response;

    if (isUpdate) {
      const userDataToUpdate = {
        email: data.email,
        nombre: data.nombre,
        numEmpleado: Number(data.numEmpleado),
        rol: data.rol as Roles,
        estado: data.estado === "Activo",
      };
      response = await updateUserAction(Number(id), userDataToUpdate);
    } else {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("nombre", data.nombre);
      formData.append("numEmpleado", data.numEmpleado.toString());
      formData.append("rol", data.rol.toLowerCase());
      formData.append("password", "12345678"); // Default password, consider changing this
      formData.append("estado", data.estado === "Activo" ? "true" : "false");
      response = await insertUser(formData);
    }

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
              <DinamicInputNumber<UserFormValues>
                name="numEmpleado"
                label="Nro. Empleado"
                placeholder="Ingrese el número de empleado"
                rules={{ required: "El número de empleado es necesario" }}
              />
              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                <DinamicInputText<UserFormValues>
                  name="nombre"
                  label="Nombre"
                  placeholder="Ingrese el nombre de empleado"
                  rules={{ required: "El nombre de empleado es necesario" }}
                />
                <DinamicInputText<UserFormValues>
                  name="email"
                  label="Correo"
                  placeholder="Ingrese el correo de empleado"
                  rules={{ required: "El correo de empleado es necesario" }}
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
                <DinamicCombobox<UserFormValues>
                  name="rol"
                  label="Rol"
                  items={roles}
                  placeholder="Seleccionar rol"
                  rules={{ required: "El rol es necesario" }}
                />
                <DinamicCombobox<UserFormValues>
                  name="estado"
                  label="Estado"
                  items={estados}
                  placeholder="Seleccionar estado"
                  rules={{ required: "El estado es necesario" }}
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
                <div className="w-full sticky bottom-0 py-4 bg-white">
                  <DinamicBouncingButton
                    action={
                      saving || loading
                        ? () => {}
                        : methods.handleSubmit(onSubmit)
                    }
                    disabled={saving || loading}
                    spin={saving || loading}
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
