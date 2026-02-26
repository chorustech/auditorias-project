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

/* SERVER ACTION */
import { getReports, ReportData } from "@/temp/serverActionSimulado";

/* UTILS */
import { isPointerArea } from "@/utils/pointerArea";

export function SelectReportsContent() {
  const router = useRouter();
  const [reports, setReports] = useState<ReportData>({ data: [], count: 0 });
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

      const data = await getReports({
        pointer: path,
      });

      setReports(data);
      setLoading(false);
    };

    fetchReports();
  }, [path]);

  return (
    <SectionContainer>
      <DinamicTable
        theadColumns={reportsColumns[path ?? ""].map((column, index) => (
          <DinamicTh key={index} column={column} />
        ))}
        tbodyRows={reports.data.map((report, index) => (
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
