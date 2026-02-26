"use client";

import { ReportType } from "@/temp/serverActionSimulado";
import { useRouter } from "next/navigation";
import { Check, SquarePen, Trash2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";

export function GeneralRowContent({
  report,
  twBgColor,
}: {
  report: ReportType;
  twBgColor: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  return (
    <>
      {report.kind === "general" && (
        <>
          <DinamicTd data={report.data.auditor} />
          <DinamicTd data={report.data.fecha} />
          <DinamicTd data={report.data.semana} />

          {report.data.linea && <DinamicTd data={report.data.linea} />}
          {report.data.coord && <DinamicTd data={report.data.coord} />}
          {report.data.picker && <DinamicTd data={report.data.picker} />}
          {report.data.ubicacion && <DinamicTd data={report.data.ubicacion} />}

          {report.data.respuestas.map((respuesta, index) => (
            <td key={index} className="px-3 py-6 text-left whitespace-nowrap">
              {respuesta ? (
                <div className="p-1 bg-green-400 rounded-full w-fit">
                  <Check className="size-3 text-white" />
                </div>
              ) : (
                <div className="relative w-fit">
                  <div className="w-full h-full bg-red-400 rounded-full animate-ping absolute z-0"></div>
                  <div className="p-1 bg-red-400 rounded-full">
                    <X className="size-3 text-white" />
                  </div>
                </div>
              )}
            </td>
          ))}

          <td
            className={`py-6 whitespace-nowrap w-fit px-3 flex gap-2 justify-center sticky right-0 z-10 ${twBgColor}`}
          >
            <BouncingButton
              action={() =>
                router.push(`/reports/${path}/update/${report.data.id}`)
              }
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
      )}
    </>
  );
}
