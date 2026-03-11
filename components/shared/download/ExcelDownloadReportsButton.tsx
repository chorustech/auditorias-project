"use client";

import * as XLSX from "xlsx";
import { useDownloadStore } from "@/stores/download/downloadStore";
import { selectReports } from "@/temp/Reports/Infrastructure/reportsController";
import { PointerArea } from "@/utils/pointerArea";
import { IQuery } from "@/temp/Shared/Domain/Interfaces/IQuery";
import {
  EolaReport,
  GeneralReport,
  NcrReport,
  RacReport,
} from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";
import { reportsQuestions } from "@/content/reports/data/questions/reportsQuestions";
interface Props {
  pointer: PointerArea;
  query: IQuery<GeneralReport & EolaReport & NcrReport & RacReport>;
}

type ReportBase = GeneralReport | EolaReport | NcrReport | RacReport;

type ExcelReportRow = {
  tipo_reporte: ReportUnion["kind"];
} & Omit<ReportBase, "respuestas"> & {
    [key: string]: "SI" | "NO";
  };

export type ReportUnion =
  | { kind: "general"; data: GeneralReport }
  | { kind: "eola"; data: EolaReport }
  | { kind: "ncr"; data: NcrReport }
  | { kind: "rac"; data: RacReport };

function transformReportsForExcel(reports: ReportUnion[]): (string | number)[][] {
  const rows: (string | number)[][] = [];

  if (reports.length > 0) {
      for (let i = 0; i < 1; i++) {
        const report = reports[i];

        if (report.kind === "general") {
          const report_type = report.data

          switch (report_type.type) {
            case "baldwin-state":
              rows.push(["ID", "Auditor", "Fecha", "Semana", "Línea", "Coordinador", "Comentarios"]);
              break;

            case "baldwin-reserve-supply":
              rows.push(["ID", "Auditor", "Fecha", "Semana", "Línea", "Coordinador", "Comentarios"]);
            break;
          
            default:
              break;
          }

        } else if (report.kind === "eola") {
        } else if (report.kind === "ncr") {
        } else {
        }
      }
    } else {
    }

  return rows
}

export default function DownloadReportsExcelButton({ pointer, query }: Props) {
  const { downloading, start, finish, setProgress } = useDownloadStore();

  const handleDownload = async () => {
    if (downloading) return;

    start();

    setProgress(10);

    const result = await selectReports({ pointer, query });

    if (!result.ok) {
      finish();
      return;
    }

    setProgress(40);

    const rows = transformReportsForExcel(result.data);

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes");

    setProgress(80);

    XLSX.writeFile(workbook, "reportes.xlsx");

    setProgress(100);

    finish();
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-40"
    >
      {downloading ? "Generando Excel..." : "Descargar Reportes"}
    </button>
  );
}
