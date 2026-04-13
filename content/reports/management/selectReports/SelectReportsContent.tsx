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
import { Input } from "@/components/ui/input";

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
import { useReportsFilter } from "@/stores/filter/reports/filterReportsStore";
import { useModal } from "@/stores/modal/modalStore";

/* TYPES */
import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import { Metadata } from "@/src/reporte-auditoria/domain/entities";

/* UTILS */
import { isPointerArea } from "@/utils/pointerArea";
import { getTwBgColorTable } from "@/utils/getTwBgColorTable";
import { DownloadReportsExcelButton } from "@/components/shared/download/ExcelDownloadReportsButton";

export function SelectReportsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  const { setAnnouncement } = useAnnouncement();
  const { setModal } = useModal();
  const { setFilter, filter } = useReportsFilter();

  const [reports, setReports] = useState<{
    data: ReporteAuditoriaConDetalles<Metadata>[];
    count: number;
  }>({ data: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchReports = async () => {
      if (!path || !filter) return;
      if (!isPointerArea(path)) return;

      try {
        setLoading(true);

        const currentFilters =
          filter.filters?.filter((f) => f.field !== "auditor") ?? [];
        if (debouncedSearchTerm) {
          currentFilters.push({
            field: "auditor",
            operator: "=",
            value: debouncedSearchTerm,
          });
        }

        const response = await getReportesAction(path, {
          page: filter.page,
          perPage: filter.perPage,
          order: filter.order,
          orderBy: filter.orderBy,
          filters: currentFilters,
        });

        if (response.ok) {
          setReports({ data: response.data, count: response.count });
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
    };

    fetchReports();
  }, [path, filter, debouncedSearchTerm, setAnnouncement]);

  const nextPage = () => {
    if (filter) {
      const newPage = filter.page + 1;
      const totalPages = Math.ceil(reports.count / filter.perPage);
      if (newPage < totalPages) {
        setFilter({ ...filter, page: newPage });
      }
    }
  };

  const prevPage = () => {
    if (filter && filter.page > 0) {
      setFilter({ ...filter, page: filter.page - 1 });
    }
  };

  const hasNextPage =
    filter && reports.count > (filter.page + 1) * filter.perPage;
  const totalPages = filter ? Math.ceil(reports.count / filter.perPage) : 1;

  const resolvePointer = () => {
    const validPaths = [
      "baldwin-state",
      "baldwin-reserve-packing",
      "baldwin-reserve-stacking",
      "baldwin-reserve-general",
      "baldwin-reserve-supply",
      "eola",
      "display-area",
      "pizza-tray",
      "rac",
      "ncr",
    ];
    return path && validPaths.includes(path) ? path : "baldwin-reserve-general";
  };

  return (
    <SectionContainer>
      <div className="p-4 w-full md:w-1/3">
        <Input
          type="text"
          placeholder="Buscar por auditor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DinamicTable
        theadColumns={reportsColumns[path ?? ""].map(
          (column: string, index: number) => (
            <DinamicTh key={index} column={column} />
          ),
        )}
        tbodyRows={reports.data.map(
          (report: ReporteAuditoriaConDetalles<Metadata>, index: number) => (
            <DinamicRow key={index} twBgColor={getTwBgColorTable({ index })}>
              {generalReportPaths.includes(path ?? "") ? (
                <GeneralRowContent
                  report={report}
                  twBgColor={getTwBgColorTable({ index })}
                />
              ) : path === "eola" ? (
                <EolaRowContent
                  report={report}
                  twBgColor={getTwBgColorTable({ index })}
                />
              ) : path === "ncr" ? (
                <NcrRowContent
                  report={report}
                  twBgColor={getTwBgColorTable({ index })}
                />
              ) : path === "rac" ? (
                <RacRowContent
                  report={report}
                  twBgColor={getTwBgColorTable({ index })}
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
        filterAction={() =>
          setModal({
            isActivated: true,
            title: "Filtrar",
            body: <FilterReportsContent />,
          })
        }
        addAction={() => router.push(`/reports/${path}/add`)}
        excelButtonContent={
          <DownloadReportsExcelButton
            pointer={resolvePointer()}
            query={{
              page: 0,
              perPage: reports.count,
              order: filter?.order ?? "asc",
              orderBy: filter?.orderBy ?? "id",
              filters: filter?.filters ?? [],
            }}
          />
        }
        backContent={<ArrowLeft className="size-5" />}
        goBack={filter?.page !== 0} // true = HAY página anterior = habilitar
        goNext={!!hasNextPage} // true = HAY siguiente = habilitar
        goNextAction={nextPage}
        goBackAction={prevPage}
        pageFirstHalf={(filter?.page ?? 0) + 1}
        pageSecondHalf={totalPages > 0 ? totalPages : 1}
      />
    </SectionContainer>
  );
}

const generalReportPaths = [
  "pizza-tray",
  "baldwin-state",
  "baldwin-reserve-supply",
  "display-area",
  "baldwin-reserve-stacking",
  "baldwin-reserve-packing",
  "baldwin-reserve-general",
];
