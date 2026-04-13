import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import { RacMetadata, Metadata } from "@/src/reporte-auditoria/domain/entities";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { useModal } from "@/stores/modal/modalStore";
import { DeleteReportContent } from "@/content/reports/management/deleteReport/DeleteReportContent";

export function RacRowContent({
  report,
  twBgColor,
}: {
  report: ReporteAuditoriaConDetalles<Metadata>;
  twBgColor: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setModal } = useModal();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

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
      <DinamicTd twClassName="text-nowrap">
        <p>{report.auditor}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{new Date(report.timestamp).toISOString().split("T")[0]}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{report.semana}</p>
      </DinamicTd>

      {"descProd" in report.metadata && (
        <>
          <DinamicTd twClassName="text-nowrap">
            <p
              className={`font-bold ${getTwEstadoTextColor((report.metadata as RacMetadata).estado)}`}
            >
              {(report.metadata as RacMetadata).estado}
            </p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p
              className={`font-bold ${getTwPonderanciaTextColor((report.metadata as RacMetadata).ponderancia)}`}
            >
              {(report.metadata as RacMetadata).ponderancia}
            </p>
          </DinamicTd>
          <DinamicTd twClassName="text-nowrap">
            <p>{(report.metadata as RacMetadata).area}</p>
          </DinamicTd>
        </>
      )}

      <td
        className={`py-6 whitespace-nowrap group-hover:bg-sky-100 transition-all duration-200 px-3 sticky right-0 z-10 ${twBgColor}`}
      >
        <div className="flex gap-2">
          <BouncingButton
            action={() => router.push(`/reports/${path}/update/${report.id}`)}
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
                body: <DeleteReportContent report_id={report.id ?? 0} />,
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
  );
}
