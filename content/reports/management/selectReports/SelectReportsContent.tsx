"use client";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { DinamicTh } from "@/components/shared/dinamicTable/dinamicRow/DinamicTh";
import { DinamicRow } from "@/components/shared/dinamicTable/dinamicRow/DinamicRow";
import { GeneralRowContent } from "@/content/reports/management/selectReports/rowContent/GeneralRowContent";
import { EolaRowContent } from "@/content/reports/management/selectReports/rowContent/EolaRowContent";
import { NcrRowContent } from "@/content/reports/management/selectReports/rowContent/NcrRowContent";
import { RacRowContent } from "@/content/reports/management/selectReports/rowContent/RacRowContent";

/* DATA */
import { reportsColumns } from "@/content/reports/data/columns/reportsColumns";

/* HOOKS */
import { useState, useEffect } from "react";

/* ICONS */
import { ArrowLeft } from "lucide-react";

/* NAVIGATION */
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

/* SERVER ACTION */
import { getReportesAction } from "@/src/reporte-auditoria/infrastructure/actions/get-all";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import { Metadata } from "@/src/reporte-auditoria/domain/entities";

/* UTILS */
import { isPointerArea } from "@/utils/pointerArea";
import { getTwBgColorTable } from "@/utils/getTwBgColorTable";

export function SelectReportsContent() {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();

  const [reports, setReports] = useState<{
    data: ReporteAuditoriaConDetalles<Metadata>[];
    count: number;
  }>({ data: [], count: 0 });
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  useEffect(() => {
    const fetchReports = async () => {
      if (!path) return;
      if (!isPointerArea(path)) return;

      try {
        const response = await getReportesAction(path, {
          page: 1,
          perPage: 10,
          order: "asc",
          orderBy: "id",
          filters: [],
        });

        if (response.ok) {
          console.log("Respuesta de getReportesAction:", response);
          setReports({ data: response.data, count: response.count });
        } else {
          console.error("Error en getReportesAction:", response);
          setAnnouncement({
            isActivated: true,
            isOk: false,
            message: response.message,
          });
        }
      } catch (error) {
        console.log("Hubo un error al obtener los reportes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [path]);

  const generalReportPaths = [
    "pizza-tray",
    "baldwin-state",
    "baldwin-reserve-supply",
    "display-area",
    "baldwin-reserve-stacking",
    "baldwin-reserve-packing",
    "baldwin-reserve-general",
  ];

  return (
    <SectionContainer>
      <DinamicTable
        theadColumns={reportsColumns[path ?? ""].map(
          (column: string, index: number) => (
            <DinamicTh key={index} column={column} />
          ),
        )}
        tbodyRows={reports.data.map(
          (report: ReporteAuditoriaConDetalles<Metadata>, index: number) => (
            <DinamicRow
              key={index}
              twBgColor={getTwBgColorTable({ index: index })}
            >
              {generalReportPaths.includes(path ?? "") ? (
                <GeneralRowContent
                  report={report}
                  twBgColor={`${getTwBgColorTable({ index: index })}`}
                />
              ) : path === "eola" ? (
                <EolaRowContent
                  report={report}
                  twBgColor={`${getTwBgColorTable({ index: index })}`}
                />
              ) : path === "ncr" ? (
                <NcrRowContent
                  report={report}
                  twBgColor={`${getTwBgColorTable({ index: index })}`}
                />
              ) : path === "rac" ? (
                <RacRowContent
                  report={report}
                  twBgColor={`${getTwBgColorTable({ index: index })}`}
                />
              ) : (
                <></>
              )}
            </DinamicRow>
          ),
        )}
        loading={loading}
        count={reports.count}
        type={"reporte"}
        backAction={() => router.push("/reports")}
        filterAction={() => {}}
        addAction={() => router.push(`/reports/${path}/add`)}
        excelAction={() => {}}
        backContent={<ArrowLeft className="size-5" />}
      />
    </SectionContainer>
  );
}
