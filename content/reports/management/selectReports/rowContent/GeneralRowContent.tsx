import { useRouter } from "next/navigation";
import { Check, SquarePen, Trash2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { useModal } from "@/stores/modal/modalStore";
import { DeleteReportContent } from "@/content/reports/management/deleteReport/DeleteReportContent";
import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import {
  Metadata,
  PizzaTrayMetadata,
  BaldwinStateMetadata,
  SurtidoMaterialesMetadata,
  DisplayAreaMetadata,
} from "@/src/reporte-auditoria/domain/entities";

export function GeneralRowContent({
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

      {"linea" in report.metadata && (
        <DinamicTd twClassName="text-nowrap">
          <p>{(report.metadata as BaldwinStateMetadata).linea}</p>
        </DinamicTd>
      )}
      {"coordinador" in report.metadata && (
        <DinamicTd twClassName="text-nowrap">
          <p>{(report.metadata as BaldwinStateMetadata).coordinador}</p>
        </DinamicTd>
      )}
      {"picker" in report.metadata && (
        <DinamicTd twClassName="text-nowrap">
          <p>{(report.metadata as SurtidoMaterialesMetadata).picker}</p>
        </DinamicTd>
      )}
      {"ubicacion" in report.metadata && (
        <DinamicTd twClassName="text-nowrap">
          <p>{(report.metadata as PizzaTrayMetadata).ubicacion}</p>
        </DinamicTd>
      )}
      {"worktable" in report.metadata && (
        <DinamicTd twClassName="text-nowrap">
          <p>{(report.metadata as DisplayAreaMetadata).worktable}</p>
        </DinamicTd>
      )}

      {report.respuestas.map((respuesta, index) => (
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
