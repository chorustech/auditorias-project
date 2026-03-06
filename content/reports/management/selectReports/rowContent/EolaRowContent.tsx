"use client";

import { ReportType } from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { useModal } from "@/stores/modal/modalStore";
import { DeleteReportContent } from "@/content/reports/management/deleteReport/DeleteReportContent";

export function EolaRowContent({
  report,
  twBgColor,
}: {
  report: ReportType;
  twBgColor: string;
}) {
  const router = useRouter();
  const { setModal } = useModal();

  return (
    <>
      {report.kind === "eola" && (
        <>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.numOrden}</p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.auditor}</p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.fecha}</p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.semana}</p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.uniNegocio}</p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{report.data.linea}</p>
          </DinamicTd>

          <td
            className={`py-6 whitespace-nowrap group-hover:bg-green-100 transition-all duration-200 px-3 sticky right-0 z-10 ${twBgColor}`}
          >
            <div className="flex gap-2">
              <BouncingButton
                action={() =>
                  router.push(`/reports/eola/update/${report.data.numOrden}`)
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
      )}
    </>
  );
}
