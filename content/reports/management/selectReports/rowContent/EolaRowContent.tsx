"use client";

import { ReportType } from "@/temp/reports/getReports";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";

export function EolaRowContent({
  report,
  twBgColor,
}: {
  report: ReportType;
  twBgColor: string;
}) {
  const router = useRouter();

  return (
    <>
      {report.kind === "eola" && (
        <>
          <DinamicTd>
            <p>{report.data.numOrden}</p>
          </DinamicTd>
          <DinamicTd>
            <p>{report.data.auditor}</p>
          </DinamicTd>
          <DinamicTd>
            <p>{report.data.fecha}</p>
          </DinamicTd>
          <DinamicTd>
            <p>{report.data.semana}</p>
          </DinamicTd>
          <DinamicTd>
            <p>{report.data.uniNegocio}</p>
          </DinamicTd>
          <DinamicTd>
            <p>{report.data.linea}</p>
          </DinamicTd>

          <td
            className={`py-6 whitespace-nowrap group-hover:bg-[#d9f2f9] transition-all duration-200 px-3 flex gap-2 justify-center sticky left-0 z-10 ${twBgColor}`}
          >
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
