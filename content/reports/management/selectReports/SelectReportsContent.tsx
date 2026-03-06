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
import { selectReports } from "@/temp/Reports/Infrastructure/reportsController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { ReportType } from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";

/* UTILS */
import { isPointerArea } from "@/utils/pointerArea";

export function SelectReportsContent() {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();
  const [reports, setReports] = useState<{
    data: ReportType[];
    count: number;
  }>({ data: [], count: 0 });

  const [loading, setLoading] = useState(true);
  const type = "reporte";

  const pathname = usePathname();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  const getTwBgColor = ({ index }: { index: number }) => {
    return index % 2 ? "bg-neutral-100" : "bg-white";
  };

  useEffect(() => {
    const fetchReports = async () => {
      if (!path) return;
      if (!isPointerArea(path)) return;

      try {
        const response = await selectReports({
          pointer: path,
          query: {
            page: 0,
            perPage: 10,
            order: "asc",
            orderBy: "id",
            filters: [],
          },
        });

        if (response.ok) {
          setReports({ data: response.data, count: response.count });
        } else {
          setAnnouncement(true, false, response.message);
        }
      } catch (error) {
        console.log("Hubo un error al obtener los reportes: ", error);
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
