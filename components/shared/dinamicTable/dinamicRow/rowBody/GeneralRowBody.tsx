"use client";

import { ReportType } from "@/temp/serverActionSimulado";
import { useRouter } from "next/navigation";
import { Check, SquarePen, Trash2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

export function GeneralRowBody({
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
      {report.kind === "general" ? (
        <>
          <td
            className={`py-6 whitespace-nowrap w-fit px-3 flex gap-2 justify-center sticky left-0 z-10 ${twBgColor}`}
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
            >
              <Trash2 className="size-5" />
            </BouncingButton>
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.auditor}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.fecha}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.semana}
          </td>
          {report.data.linea && (
            <td className="px-3 py-6 text-left whitespace-nowrap">
              {report.data.linea}
            </td>
          )}
          {report.data.coord && (
            <td className="px-3 py-6 text-left whitespace-nowrap">
              {report.data.coord}
            </td>
          )}
          {report.data.picker && (
            <td className="px-3 py-6 text-left whitespace-nowrap">
              {report.data.picker}
            </td>
          )}
          {report.data.ubicacion && (
            <td className="px-3 py-6 text-left whitespace-nowrap">
              {report.data.ubicacion}
            </td>
          )}
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
        </>
      ) : (
        <></>
      )}
    </>
  );
}
