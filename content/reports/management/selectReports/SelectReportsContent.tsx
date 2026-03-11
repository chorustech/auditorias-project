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
import { FilterReportsContent } from "@/content/reports/management/selectReports/filterReports/FilterReportsContent";

/* DATA */
import { reportsColumns } from "@/content/reports/data/columns/reportsColumns";

/* HOOKS */
import { useState, useEffect, useCallback } from "react";

/* ICONS */
import { ArrowLeft } from "lucide-react";

/* NAVIGATION */
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

/* SERVER ACTION */
import { selectReports } from "@/temp/Reports/Infrastructure/reportsController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useReportsFilter } from "@/stores/filter/reports/filterReportsStore";
import { useModal } from "@/stores/modal/modalStore";

/* TYPES */
import {
  EolaReport,
  GeneralReport,
  NcrReport,
  RacReport,
  ReportType,
} from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";

/* UTILS */
import { isPointerArea } from "@/utils/pointerArea";
import { getTwBgColorTable } from "@/utils/getTwBgColorTable";
import ExcelDownloadButton from "@/components/shared/download/ExcelDownloadButton";
import ExcelDownloadReportsButton from "@/components/shared/download/ExcelDownloadReportsButton";
import DownloadReportsExcelButton from "@/components/shared/download/ExcelDownloadReportsButton";

export function SelectReportsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  const { setAnnouncement } = useAnnouncement();
  const { setModal } = useModal();
  const { setFilter, filter } = useReportsFilter();

  const [reports, setReports] = useState<{
    data: ReportType[];
    count: number;
  }>({ data: [], count: 0 });

  const [loading, setLoading] = useState(false);

  const updateFilter = (changes: Partial<typeof filter>) => {
    if (!filter) return;

    setFilter({
      ...filter,
      ...changes,
    });
  };

  const nextPage = () => {
    if (!filter) return;

    updateFilter({
      page: filter.page + 1,
    });
  };

  const prevPage = () => {
    if (!filter) return;

    updateFilter({
      page: Math.max(filter.page - 1, 0),
    });
  };

  const hasNextPage =
    filter && (filter.page + 1) * filter.perPage < reports.count;

  const fetchReports = useCallback(async () => {
    if (!path) return;
    if (!isPointerArea(path)) return;
    if (!filter) return;

    console.log(filter);

    try {
      setLoading(true);

      const response = await selectReports({
        pointer: path,
        query: {
          page: filter.page,
          perPage: filter.perPage,
          order: filter.order,
          orderBy: filter.orderBy,
          checkFilters: filter.checkFilters,
          filters: filter.filters,
        },
      });

      if (response.ok) {
        setReports({
          data: response.data,
          count: response.count,
        });
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("Hubo un error al obtener los reportes:", error);
    } finally {
      setLoading(false);
    }
  }, [path, filter, setAnnouncement]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  useEffect(() => {
    setFilter({
      page: 0,
      perPage: 10,
      order: "asc",
      orderBy: "id",
      checkFilters: false,
      filters: [],
    });
  }, [setFilter]);

  return (
    <SectionContainer>
      <DownloadReportsExcelButton
        pointer={
          path !== null
            ? path === "baldwin-state" ||
              path === "baldwin-reserve-packing" ||
              path === "baldwin-reserve-stacking" ||
              path === "baldwin-reserve-general" ||
              path === "baldwin-reserve-supply" ||
              path === "eola" ||
              path === "display-area" ||
              path === "pizza-tray" ||
              path === "rac" ||
              path === "ncr"
              ? path
              : "baldwin-reserve-general"
            : "baldwin-reserve-general"
        }
        query={{
          page: 0,
          perPage: reports.count,
          order: filter?.order ?? "asc",
          orderBy: filter?.orderBy ?? "id",
          filters: filter?.filters ?? [],
          checkFilters: filter?.checkFilters ?? false,
        }}
      />
      <DinamicTable
        theadColumns={reportsColumns[path ?? ""].map(
          (column: string, index: number) => (
            <DinamicTh key={index} column={column} />
          ),
        )}
        tbodyRows={reports.data.map((report: ReportType, index: number) => (
          <DinamicRow
            key={index}
            twBgColor={getTwBgColorTable({ index: index })}
          >
            {report.kind === "general" ? (
              <GeneralRowContent
                report={report}
                twBgColor={`${getTwBgColorTable({ index: index })}`}
              />
            ) : report.kind === "eola" ? (
              <EolaRowContent
                report={report}
                twBgColor={`${getTwBgColorTable({ index: index })}`}
              />
            ) : report.kind === "ncr" ? (
              <NcrRowContent
                report={report}
                twBgColor={`${getTwBgColorTable({ index: index })}`}
              />
            ) : report.kind === "rac" ? (
              <RacRowContent
                report={report}
                twBgColor={`${getTwBgColorTable({ index: index })}`}
              />
            ) : (
              <></>
            )}
          </DinamicRow>
        ))}
        loading={loading}
        count={reports.count}
        type={"reporte"}
        backAction={() => router.push("/reports")}
        filterAction={() =>
          setModal({
            isActivated: true,
            title: "Filtrar",
            body: <FilterReportsContent />,
          })
        }
        addAction={() => router.push(`/reports/${path}/add`)}
        excelAction={() => {}}
        backContent={<ArrowLeft className="size-5" />}
        goNext={!hasNextPage}
        goBack={filter?.page === 0 ? false : true}
        goNextAction={nextPage}
        goBackAction={prevPage}
        pageFirstHalf={(filter?.page ?? 0) + 1}
        pageSecondHalf={
          Math.ceil(reports.count ?? 0) / (filter?.perPage ?? 1) === 0
            ? "1"
            : Math.ceil((reports.count ?? 0) / (filter?.perPage ?? 1))
        }
      />
    </SectionContainer>
  );
}
