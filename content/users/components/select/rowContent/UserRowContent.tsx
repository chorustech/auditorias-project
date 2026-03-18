"use client";

import { UserType } from "@/temp/Users/Infrastructure/Types/userData";
import { useRouter } from "next/navigation";
import { Power, PowerOff, SquarePen, Trash2 } from "lucide-react";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { useModal } from "@/stores/modal/modalStore";
import { DeleteUserContent } from "@/content/users/components/delete/DeleteUserContent";
import { UpdateUserEstatusContent } from "@/content/users/components/updateUserEstatus/UpdateUserEstatusContent";

export function UserRowContent({
  user,
  twBgColor,
}: {
  user: UserType;
  twBgColor: string;
}) {
  const router = useRouter();
  const { setModal } = useModal();

  return (
    <>
      <DinamicTd twClassName="text-nowrap min-w-22">
        <BouncingButton
          action={() =>
            setModal({
              isActivated: true,
              title: user.estado === "ACTIVO" ? "Inactivar" : "Activar",
              body: <UpdateUserEstatusContent user={user} />,
            })
          }
          backgroundColorHover="#ffffff"
          backgroundColor={`${user.estado === "ACTIVO" ? "#22c55e" : "#ef4444"}`}
          textColor="#ffffff"
          textColorHover={`${user.estado === "ACTIVO" ? "#22c55e" : "#ef4444"}`}
          border="2px solid #ffffff"
          borderHover={`2px solid ${user.estado === "ACTIVO" ? "#22c55e" : "#ef4444"}`}
          twClassName="p-2 rounded-full w-fit h-fit m-auto"
          disabled={false}
        >
          {user.estado === "ACTIVO" ? (
            <Power className="size-5" />
          ) : (
            <PowerOff className="size-5" />
          )}
        </BouncingButton>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{user.numEmpleado}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{user.nombre}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{user.email}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{user.rol}</p>
      </DinamicTd>

      <td
        className={`py-6 whitespace-nowrap group-hover:bg-sky-100 transition-all duration-200 px-3 flex gap-2 justify-center sticky right-0 z-10 ${twBgColor}`}
      >
        <BouncingButton
          action={() => router.push(`/users/update/${user.id}`)}
          backgroundColorHover="#ffffff"
          backgroundColor="#fbbf24"
          textColor="#ffffff"
          textColorHover="#fbbf24"
          border="2px solid #ffffff"
          borderHover="2px solid #fbbf24"
          twClassName="p-2 rounded-lg w-fit h-fit"
          disabled={false}
        >
          <SquarePen className="size-5" />
        </BouncingButton>
        <BouncingButton
          action={() =>
            setModal({
              isActivated: true,
              title: "Eliminar",
              body: <DeleteUserContent user={user} />,
            })
          }
          backgroundColorHover="#ffffff"
          backgroundColor="#ef4444"
          textColor="#ffffff"
          textColorHover="#ef4444"
          border="2px solid #ffffff"
          borderHover="2px solid #ef4444"
          twClassName="p-2 rounded-lg w-fit h-fit"
          disabled={false}
        >
          <Trash2 className="size-5" />
        </BouncingButton>
      </td>
    </>
  );
}
