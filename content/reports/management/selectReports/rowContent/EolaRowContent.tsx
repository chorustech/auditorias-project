import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import {
  EolaMetadata,
  Metadata,
} from "@/src/reporte-auditoria/domain/entities";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { useModal } from "@/stores/modal/modalStore";
import { DeleteReportContent } from "@/content/reports/management/deleteReport/DeleteReportContent";

export function EolaRowContent({
  report,
  twBgColor,
}: {
  report: ReporteAuditoriaConDetalles<EolaMetadata>;
  twBgColor: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setModal } = useModal();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  console.log(report.metadata.numOrden);

  return (
    <>
      <DinamicTd twClassName="text-nowrap">
        <p>{report.metadata.numOrden}</p> {/* nro. Orden */}
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{report.auditor}</p> {/* Usuario */}
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{new Date(report.timestamp).toISOString().split("T")[0]}</p>{" "}
        {/* Fecha */}
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{report.semana}</p> {/* Semana */}
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{report.metadata.uniNegocio}</p> {/* Ud. Negocio */}
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{report.metadata.linea}</p> {/* Línea */}
      </DinamicTd>
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
