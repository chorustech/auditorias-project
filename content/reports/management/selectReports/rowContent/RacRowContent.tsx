"use client";

import { ReportType } from "@/temp/reports/getReports";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";

export function RacRowContent({
  report,
  twBgColor,
}: {
  report: ReportType;
  twBgColor: string;
}) {
  const router = useRouter();

  return (
    <>
      {report.kind === "rac" ? (
        <>
          <DinamicTd data={report.data.numRac.toString()} />
          <DinamicTd data={report.data.fecha} />
          <DinamicTd data={report.data.estado} />
          <DinamicTd data={report.data.ponderancia} />
          <DinamicTd data={report.data.area} />

          <td
            className={`py-6 whitespace-nowrap w-fit px-3 flex gap-2 justify-center sticky left-0 z-10 ${twBgColor}`}
          >
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
      ) : (
        <></>
      )}
    </>
  );
}
