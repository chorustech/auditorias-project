"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, SlidersHorizontal, Plus, Sheet } from "lucide-react";
import { BouncingButton } from "../bouncingButton/BouncingButton";
import { usePathname } from "next/navigation";

export function DinamicTableHeader() {
  const router = useRouter();

  const pathname = usePathname();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  return (
    <div className="flex flex-col items-center p-6 justify-between gap-4 lg:flex-row md:flex-row">
      <div className="flex justify-center w-full gap-4 lg:justify-normal md:justify-normal">
        {/* BOTÓN IR HACIA ATRÁS */}
        <BouncingButton
          action={() => router.push("/reports")}
          backgroundColorHover="#ffffff"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit p-4 rounded-2xl"
        >
          <ArrowLeft className="size-5" />
        </BouncingButton>

        {/* BOTÓN FILTRAR */}
        <BouncingButton
          action={() => {}}
          backgroundColorHover="#ffffff"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit p-4 rounded-2xl"
        >
          <SlidersHorizontal className="size-5" />
        </BouncingButton>
      </div>

      <div className="flex justify-between w-full gap-4 lg:justify-end md:justify-end">
        {/* BOTÓN AGREGAR */}
        <BouncingButton
          action={() => router.push(`/reports/${path}/add`)}
          backgroundColorHover="#ffffff"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit p-4 rounded-2xl"
        >
          <Plus className="size-5" />
        </BouncingButton>

        {/* BOTÓN EXPORTAR EXCEL */}
        <BouncingButton
          action={() => {}}
          backgroundColorHover="#ffffff"
          backgroundColor="#1D6F42"
          textColor="#ffffff"
          textColorHover="#1D6F42"
          border="2px solid #ffffff"
          borderHover="2px solid #1D6F42"
          twClassName="w-fit h-fit p-4 rounded-2xl"
        >
          <Sheet className="size-5" />
        </BouncingButton>
      </div>
    </div>
  );
}
