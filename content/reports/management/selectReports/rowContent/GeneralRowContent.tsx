"use client";

import { ReportType } from "@/temp/reports/getReports";
import { useRouter } from "next/navigation";
import { Check, SquarePen, Trash2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";

export function GeneralRowContent({
  report,
  twBgColor,
  onDelete,
}: {
  report: ReportType;
  twBgColor: string;
  onDelete: (id: number) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  return (
    <>
      {report.kind === "general" && (
        <>
          <DinamicTd>
            <p>{report.data.auditor}</p>
          </DinamicTd>
          <DinamicTd>
            <p>{report.data.fecha}</p>
          </DinamicTd>
          <DinamicTd>
            <p>{report.data.semana}</p>
          </DinamicTd>

          {report.data.linea && (
            <DinamicTd>
              <p>{report.data.linea}</p>
            </DinamicTd>
          )}
          {report.data.coord && (
            <DinamicTd>
              <p>{report.data.coord}</p>
            </DinamicTd>
          )}
          {report.data.picker && (
            <DinamicTd>
              <p>{report.data.picker}</p>
            </DinamicTd>
          )}
          {report.data.ubicacion && (
            <DinamicTd>
              <p>{report.data.ubicacion}</p>
            </DinamicTd>
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

          <td
            className={`py-6 whitespace-nowrap group-hover:bg-[#d9f2f9] transition-all duration-200 px-3 flex gap-2 justify-center sticky right-0 z-10 ${twBgColor}`}
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
              action={() => onDelete(report.data.id)}
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
