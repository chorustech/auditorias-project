"use client";

import { UserType } from "@/temp/users/getUsers";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";

export function UserRowContent({
  user,
  twBgColor,
}: {
  user: UserType;
  twBgColor: string;
}) {
  const router = useRouter();

  return (
    <>
      <DinamicTd data={user.numEmpleado} />
      <DinamicTd data={user.nombre} />
      <DinamicTd data={user.email} />
      <DinamicTd data={user.rol} />

      <td
        className={`py-6 whitespace-nowrap w-fit px-3 flex gap-2 justify-center sticky right-0 z-10 ${twBgColor}`}
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
          action={() => /* openEditDeleteModal(
                              dato.usuario.id,
                              dato,
                              "ELIMINAR",
                            ) */ {}}
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
