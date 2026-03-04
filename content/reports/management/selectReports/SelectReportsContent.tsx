"use client";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { DinamicTh } from "@/components/shared/dinamicTable/dinamicRow/DinamicTh";
import { DinamicRow } from "@/components/shared/dinamicTable/dinamicRow/DinamicRow";
import { GeneralRowContent } from "@/content/reports/management/selectReports/rowContent/GeneralRowContent";
import { EolaRowContent } from "./rowContent/EolaRowContent";
import { NcrRowContent } from "./rowContent/NcrRowContent";
import { RacRowContent } from "./rowContent/RacRowContent";

/* DATA */
import { reportsColumns } from "@/content/reports/data/columns/reportsColumns";

/* HOOKS */
import { useState, useEffect } from "react";

/* ICONS */
import { ArrowLeft } from "lucide-react";

/* NAVIGATION */
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

/* UTILS */
import { isPointerArea } from "@/utils/pointerArea";
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";

export type ReportType =
  | { kind: "general"; data: any }
  | { kind: "eola"; data: any }
  | { kind: "ncr"; data: any }
  | { kind: "rac"; data: any };

export function SelectReportsContent() {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();
  const [reports, setReports] = useState<{ data: ReportType[]; count: number }>(
    { data: [], count: 0 },
  );
  
  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
      return;
    }

    try {
      const response = await fetch(`/api/reportes/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.ok) {
        setAnnouncement(true, "bg-green-500", <span>{result.message}</span>);
        // Eliminar el reporte del estado para actualizar la UI instantáneamente
        setReports(prev => ({
          ...prev,
          data: prev.data.filter(report => report.data.id !== id),
          count: prev.count - 1,
        }));
      } else {
        setAnnouncement(true, "bg-red-500", <span>{result.message}</span>);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado";
      setAnnouncement(true, "bg-red-500", <span>{message}</span>);
    }
  };

  const [loading, setLoading] = useState(true);
  const type = "reporte";

  const pathname = usePathname();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  console.log("Detectado pathname:", pathname);
  console.log("Detectado path:", path);

  const getTwBgColor = ({ index }: { index: number }) => {
    return index % 2 ? "bg-neutral-100" : "bg-white";
  };

  useEffect(() => {
    const fetchReports = async () => {
      if (!path) return;
      if (!isPointerArea(path)) return;

      try {
        const res = await fetch(`/api/reportes/${path}`);

        console.log(
          "Respuesta de la API - Status:",
          res.status,
          res.statusText,
        );

        const rawText = await res.text();
        console.log("Respuesta de la API - Texto crudo:", rawText);

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText} - ${rawText}`);
        }

        const data: ReporteAuditoriaConDetalles<any>[] = JSON.parse(rawText);

        if (!Array.isArray(data)) {
          console.error("Error: La respuesta de la API no es un array.", data);
          throw new Error("La respuesta de la API no es un array");
        }

        const transformedData = data.map(
          (report) => {
            const uniqueKinds = ["eola", "ncr", "rac"];
            const kind = uniqueKinds.includes(report.tipo_auditoria)
              ? report.tipo_auditoria
              : "general";

            return {
              kind: kind,
              data: {
                id: report.id,
                respuestas: report.respuestas,
                auditor: report.auditor,
                semana: report.semana,
                fecha: new Date(report.timestamp).toLocaleDateString(),
                coord: report.metadata.coordinador,
                ...report.metadata,
              },
            };
          },
        );

        console.log("Datos transformados para renderizar:", transformedData);
        setReports({
          data: transformedData as ReportType[],
          count: data.length,
        });
      } catch (error) {
        console.error("No se pudieron obtener los reportes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [path]);

  return (
    <SectionContainer>
      <DinamicTable
        theadColumns={reportsColumns[path ?? ""].map(
          (column: string, index: number) => (
            <DinamicTh key={index} column={column} />
          ),
        )}
        tbodyRows={reports.data.map((report: ReportType, index: number) => (
          <DinamicRow key={index} twBgColor={getTwBgColor({ index: index })}>
            {report.kind === "general" ? (
              <GeneralRowContent
                report={report}
                twBgColor={`${getTwBgColor({ index: index })}`}
                onDelete={handleDelete}
              />
            ) : report.kind === "eola" ? (
              <EolaRowContent
                report={report}
                twBgColor={`${getTwBgColor({ index: index })}`}
              />
            ) : report.kind === "ncr" ? (
              <NcrRowContent
                report={report}
                twBgColor={`${getTwBgColor({ index: index })}`}
              />
            ) : report.kind === "rac" ? (
              <RacRowContent
                report={report}
                twBgColor={`${getTwBgColor({ index: index })}`}
              />
            ) : (
              <></>
            )}
          </DinamicRow>
        ))}
        loading={loading}
        count={reports.count}
        type={type}
        backAction={() => router.push("/reports")}
        filterAction={() => {}}
        addAction={() => router.push(`/reports/${path}/add`)}
        excelAction={() => {}}
        backContent={<ArrowLeft className="size-5" />}
      />
    </SectionContainer>
  );
}
