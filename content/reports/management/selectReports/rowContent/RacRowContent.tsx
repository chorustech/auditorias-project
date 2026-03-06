"use client";

import { ReportType } from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { useModal } from "@/stores/modal/modalStore";
import { DeleteReportContent } from "@/content/reports/management/deleteReport/DeleteReportContent";

export function RacRowContent({
  report,
  twBgColor,
}: {
  report: ReportType;
  twBgColor: string;
}) {
  const router = useRouter();
  const { setModal } = useModal();

  const getTwEstadoTextColor = (estado: string) => {
    if (estado === "CERRADO") {
      return "text-green-500";
    } else {
      return "text-red-500";
    }
  };

  const getTwPonderanciaTextColor = (ponderancia: string) => {
    if (ponderancia === "LOW") {
      return "text-green-500";
    } else if (ponderancia === "MEDIUM") {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };

  return (
    <>
      {report.kind === "rac" ? (
        <>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.numRac.toString()}</p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.fecha}</p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p
              className={`font-bold ${getTwEstadoTextColor(report.data.estado)}`}
            >
              {report.data.estado}
            </p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p
              className={`font-bold ${getTwPonderanciaTextColor(report.data.ponderancia)}`}
            >
              {report.data.ponderancia}
            </p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.area}</p>
          </DinamicTd>

          <td
            className={`py-6 whitespace-nowrap group-hover:bg-green-100 transition-all duration-200 px-3 sticky right-0 z-10 ${twBgColor}`}
          >
            <div className="flex gap-2">
              <BouncingButton
                action={() =>
                  router.push(`/reports/rac/update/${report.data.numRac}`)
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
                  setModal(
                    true,
                    "Eliminar",
                    <DeleteReportContent report_id={report.data.id ?? 0} />,
                  );
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
      ) : (
        <></>
      )}
    </>
  );
}
