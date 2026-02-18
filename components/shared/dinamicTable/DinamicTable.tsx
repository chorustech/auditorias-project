"use client";

import Link from "next/link";
import { SquareButton } from "../squareButton/squareButton";
import { ArrowLeft, SlidersHorizontal, Plus, Sheet } from "lucide-react";
import { useRouter } from "next/navigation";

export function DinamicTable({ pointer }: { pointer: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-green-400 overflow-y-auto">
      {/* HEADER */}
      <div className="flex flex-col items-center p-6 justify-between gap-4 lg:flex-row md:flex-row">
        <div className="flex justify-center w-full gap-4 lg:justify-normal md:justify-normal">
          {/* BOTÓN IR HACIA ATRÁS */}
          <SquareButton
            action={() => router.push("/reports")}
            Icon={ArrowLeft}
            rotate={false}
            color="bg-[#00A0D0]"
          />

          {/* BOTÓN FILTRAR */}
          <SquareButton
            action={() => {}}
            Icon={SlidersHorizontal}
            rotate={false}
            color="bg-[#00A0D0]"
          />
        </div>

        <div className="flex justify-between w-full gap-4 lg:justify-end md:justify-end">
          {/* BOTÓN AGREGAR */}
          <SquareButton
            action={() => router.push(`/reports/${pointer}/add`)}
            Icon={Plus}
            rotate={false}
            color="bg-[#00A0D0]"
          />

          {/* BOTÓN EXPORTAR EXCEL */}
          <SquareButton
            action={() => {}}
            Icon={Sheet}
            rotate={false}
            color="bg-[#00A0D0]"
          />
        </div>
      </div>

      {/* TABLA */}

      {/* FOOTER */}
      <div className="flex flex-col justify-center p-6 lg:justify-between md:justify-between lg:flex-row md:flex-row">
        <div>
          <p>
            Total: <span className="font-semibold text-[#00A0D0]">2</span>{" "}
            clientes
          </p>
        </div>
        <div>
          <p>Página: 1 de 1</p>
        </div>
      </div>

      {/* <Link href={`/reports/${pointer}/update/144`} className="bg-red-400">
        Actualizar reporte
      </Link> */}
    </div>
  );
}
