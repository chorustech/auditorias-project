"use client";

import { ReportType } from "@/temp/serverActionSimulado";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

export function NcrRowBody({
  report,
  twBgColor,
}: {
  report: ReportType;
  twBgColor: string;
}) {
  const router = useRouter();

  return (
    <>
      {report.kind === "ncr" ? (
        <>
          <td className="px-3 py-6 text-left whitespace-nowrap w-full">
            {report.data.numNcr}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap w-full">
            {report.data.fecha}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap w-full">
            {report.data.semana}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap w-full">
            {report.data.numParte}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap w-full">
            {report.data.proveedor}
          </td>
          <td
            className={`py-6 whitespace-nowrap w-fit px-3 flex gap-2 justify-center sticky left-0 z-10 ${twBgColor}`}
          >
            <BouncingButton
              action={() =>
                router.push(`/reports/ncr/update/${report.data.numNcr}`)
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
