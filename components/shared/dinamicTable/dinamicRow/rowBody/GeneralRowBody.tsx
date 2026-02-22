"use client";

import { ReportType } from "@/temp/serverActionSimulado";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2, Check, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

export function GeneralRowBody({ report }: { report: ReportType }) {
  const router = useRouter();
  const pathname = usePathname();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  return (
    <>
      {report.kind === "general" ? (
        <>
          <td className="py-6 whitespace-nowrap px-3 flex gap-2 justify-center">
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
          {/* {report.data.respuestas.map((respuesta, index) => (
            <td key={index} className="px-3 py-6 text-left whitespace-nowrap">
              {respuesta ? (
                <Check className="size-5 text-green-500" />
              ) : (
                <X className="size-5 text-red-500" />
              )}
            </td>
          ))} */}
          {report.data.respuestas.map((respuesta, index) => (
            <td key={index} className="px-3 py-6 text-left whitespace-nowrap">
              {respuesta ? (
                <div className="p-2 bg-green-400 rounded-full w-fit" />
              ) : (
                <div className="relative w-fit">
                  <div className="p-2 bg-red-400 rounded-full animate-ping absolute z-0"></div>
                  <div className="p-2 bg-red-400 rounded-full"></div>
                </div>
              )}
            </td>
          ))}
          {/* {report.data.respuestas.map((respuesta, index) => (
            <td
              key={index}
              className={`py-6 text-left whitespace-nowrap ${index === 0 ? "pl-3" : index === report.data.respuestas.length - 1 ? "pr-3" : ""}`}
            >
              <div
                className={`w-10 min-w-full h-5 ${index === 0 ? "rounded-l-full" : index === report.data.respuestas.length - 1 ? "rounded-r-full" : ""} ${respuesta ? "bg-green-400" : "bg-red-400"}`}
              />
            </td>
          ))} */}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
