"use client";

import { ReportType } from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";
import { useRouter } from "next/navigation";
import { Check, SquarePen, Trash2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { useModal } from "@/stores/modal/modalStore";
import { DeleteReportContent } from "@/content/reports/management/deleteReport/DeleteReportContent";

export function GeneralRowContent({
  report,
  twBgColor,
}: {
  report: ReportType;
  twBgColor: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setModal } = useModal();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  return (
    <>
      {report.kind === "general" && (
        <>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.usuario_nombre}</p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.fecha}</p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.semana}</p>
          </DinamicTd>

          {report.data.linea && (
            <DinamicTd twClassName="text-nowrap">
              <p>{report.data.linea}</p>
            </DinamicTd>
          )}
          {report.data.worktable && (
            <DinamicTd twClassName="text-nowrap">
              <p>{report.data.worktable}</p>
            </DinamicTd>
          )}
          {report.data.coord && (
            <DinamicTd twClassName="text-nowrap">
              <p>{report.data.coord}</p>
            </DinamicTd>
          )}
          {report.data.picker && (
            <DinamicTd twClassName="text-nowrap">
              <p>{report.data.picker}</p>
            </DinamicTd>
          )}
          {report.data.ubicacion && (
            <DinamicTd twClassName="text-nowrap">
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
            className={`py-6 whitespace-nowrap group-hover:bg-sky-100 transition-all duration-200 px-3 sticky right-0 z-10 ${twBgColor}`}
          >
            <div className="flex gap-2">
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
                action={() => {
                  setModal({
                    isActivated: true,
                    title: "Eliminar",
                    body: (
                      <DeleteReportContent report_id={report.data.id ?? 0} />
                    ),
                  });
                }}
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
            </div>
          </td>
        </>
      )}
    </>
  );
}
