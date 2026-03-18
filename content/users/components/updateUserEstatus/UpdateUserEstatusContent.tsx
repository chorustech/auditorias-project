"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { Loader, Power, PowerOff } from "lucide-react";

/* SERVER ACTIONS */
import { updateUserStatus } from "@/temp/Users/Infrastructure/usersController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useModal } from "@/stores/modal/modalStore";
import { useUsersFilter } from '@/stores/filter/users/filterUsersStore'

/* TYPES */
import { UserType } from "@/temp/Users/Infrastructure/Types/userData";

export function UpdateUserEstatusContent({ user }: { user: UserType }) {
  const [changingState, setChangingState] = useState(false);
  const { setAnnouncement } = useAnnouncement();
  const { modal, setModal } = useModal();
  const { filter, setFilter } = useUsersFilter()

  const methods = useForm<{ id: number }>();

  const onSubmit = async () => {
    try {
      setChangingState(true);

      const response = await updateUserStatus(user.id, user.estado);

      if (response.ok) {
        if (!filter) return;

        setFilter({
          ...filter,
          page: 0,
        });
        setAnnouncement({
          isActivated: true,
          isOk: true,
          message: response.message,
        });
        setModal({
          isActivated: false,
          title: modal.title ?? "",
          body: modal.body,
        });
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
      }

      setChangingState(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <p>
          Al dar clic en{" "}
          <span
            className={`font-semibold ${user.estado === "ACTIVO" ? "text-red-500" : "text-green-500"}`}
          >
            {user.estado === "ACTIVO" ? "Inactivar" : "Activar"}
          </span>
          , el estatus del usuario{" "}
          <span className="font-semibold">{user.nombre}</span> será cambiado a{" "}
          <span
            className={`font-semibold ${user.estado === "ACTIVO" ? "text-red-500" : "text-green-500"}`}
          >
            {user.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO"}
          </span>
        </p>
      </div>
      <div className="">
        {/* BOTÓN GUARDAR */}
        <div className="w-full sticky bottom-0 pt-4">
          <FormProvider {...methods}>
            <div className="flex gap-4">
              <BouncingButton
                action={
                  changingState
                    ? () => {}
                    : () => {
                        setModal({
                          isActivated: false,
                          title: modal.title ?? "",
                          body: modal.body,
                        });
                      }
                }
                backgroundColorHover="#00A0D0"
                backgroundColor="#ffffff"
                textColor="#00A0D0"
                textColorHover="#ffffff"
                border="2px solid #00A0D0"
                borderHover="2px solid #00A0D0"
                twClassName="w-full h-fit px-4 py-2 rounded-2xl"
                disabled={changingState ? true : false}
              >
                <span>Cancelar</span>
              </BouncingButton>
              <BouncingButton
                action={
                  changingState ? () => {} : methods.handleSubmit(onSubmit)
                }
                backgroundColorHover={`${user.estado === "ACTIVO" ? "#ef4444" : "#22c55e"}`}
                backgroundColor={`${user.estado === "ACTIVO" ? "#ef4444" : "#22c55e"}`}
                textColor="#ffffff"
                textColorHover="#ffffff"
                border={`2px solid ${user.estado === "ACTIVO" ? "#ef4444" : "#22c55e"}`}
                borderHover={`2px solid ${user.estado === "ACTIVO" ? "#ef4444" : "#22c55e"}`}
                twClassName="w-full h-fit px-4 py-2 rounded-2xl"
                disabled={changingState ? true : false}
              >
                {changingState ? (
                  <>
                    <span className="text-transparent">E</span>
                    <Loader className="size-4 animate-spin" />
                    <span className="text-transparent">E</span>
                  </>
                ) : (
                  <>
                    {user.estado === "ACTIVO" ? (
                      <PowerOff className="size-4" />
                    ) : (
                      <Power className="size-4" />
                    )}
                    <span>
                      {user.estado === "ACTIVO" ? "Inactivar" : "Activar"}
                    </span>
                  </>
                )}
              </BouncingButton>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
