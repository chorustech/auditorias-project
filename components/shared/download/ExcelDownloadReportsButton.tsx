"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* HOOKS */
import { useRef } from "react";

/* ICONS */
import { Download, Loader } from "lucide-react";

/* LIBS */
import * as XLSX from "xlsx-js-style";

/* SERVER ACTION */
import { getReportesAction } from "@/src/reporte-auditoria/infrastructure/actions/get-all";

/* STORES */
import { useDownloadStore } from "@/stores/download/downloadStore";
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { IQuery } from "@/src/shared/domain/Entities/Query";
import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import { Metadata } from "@/src/reporte-auditoria/domain/entities";

/* UTILS */
import { PointerArea } from "@/utils/pointerArea";
import { autoSizeColumns } from "@/components/shared/download/utils/shared/autoSizeColumns";
import { transformReportsForExcel } from "@/components/shared/download/utils/reports/transformReportsForExcel";
import { setMerges } from "@/components/shared/download/utils/reports/setMerges";
import { setColumnsStyles } from "@/components/shared/download/utils/reports/setColumnsStyles";
import { getDate } from "@/utils/date";

export function DownloadReportsExcelButton({
  pointer,
  query,
}: {
  pointer: PointerArea;
  query: IQuery<ReporteAuditoriaConDetalles<Metadata>>;
}) {
  const { setAnnouncement } = useAnnouncement();
  const { downloading, start, finish, setProgress } = useDownloadStore();

  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const stopInterval = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const animateProgressTo = (target: number) => {
    return new Promise<void>((resolve) => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      progressInterval.current = setInterval(() => {
        const current = useDownloadStore.getState().progress;

        if (current >= target) {
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
          }
          resolve();
          return;
        }

        let step = 1;

        if (current < 80)
          step = 4; // rápido
        else if (current < 95)
          step = 2; // medio
        else step = 1; // lento

        setProgress(Math.min(current + step, target));
      }, 30);
    });
  };

  const handleDownloadReports = async () => {
    try {
      if (downloading) return;

      start();
      setProgress(0);

      await new Promise((r) => setTimeout(r, 200));
      await animateProgressTo(99);

      const result = await getReportesAction(pointer, query);

      if (!result.ok) {
        finish();
        return;
      }

      const workbook = XLSX.utils.book_new();
      const rows = transformReportsForExcel(result.data);
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const style_worksheet = setColumnsStyles(pointer, worksheet, result.data);

      style_worksheet["!cols"] = autoSizeColumns(rows);
      style_worksheet["!merges"] = setMerges(pointer);

      const file_name = pointer + "_" + getDate();

      XLSX.utils.book_append_sheet(workbook, style_worksheet, "Reportes");

      XLSX.writeFile(workbook, file_name + ".xlsx");

      finish();
      stopInterval();
    } catch (error) {
      setAnnouncement({
        isActivated: true,
        isOk: false,
        message: "Ocurrió un error al exportar los reportes a Excel",
      });
      finish();
      stopInterval();
      console.log("Error: ", error);
    }
  };

  return (
    <BouncingButton
      action={handleDownloadReports}
      backgroundColorHover="#ffffff"
      backgroundColor="#1D6F42"
      textColor="#ffffff"
      textColorHover="#1D6F42"
      border="2px solid #ffffff"
      borderHover="2px solid #1D6F42"
      twClassName="w-fit h-fit p-4 rounded-2xl"
      disabled={downloading}
    >
      {downloading ? (
        <Loader className="size-5 animate-spin" />
      ) : (
        <Download className="size-5" />
      )}
    </BouncingButton>
  );
}
