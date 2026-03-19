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
import { selectStatisticsObject } from "@/temp/Reports/Infrastructure/reportsController";

/* STORES */
import { useDownloadStore } from "@/stores/download/downloadStore";
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */

/* UTILS */
import { autoSizeColumns } from "@/components/shared/download/utils/shared/autoSizeColumns";
import { getDate } from "@/utils/date";
import { transformStatisticsForExcel } from "@/components/shared/download/utils/statistics/transformStatisticsForExcel";
import { setMerges } from "@/components/shared/download/utils/statistics/setMerges";
import { setColumnsStyles } from "@/components/shared/download/utils/statistics/setColumnsStyles";

export function ExcelDownloadStatisticsButton() {
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

  const handleDownloadStatistics = async () => {
    try {
      if (downloading) return;

      start();
      setProgress(0);

      await new Promise((r) => setTimeout(r, 200));
      await animateProgressTo(99);

      const result = await selectStatisticsObject({ month: 0 });

      if (!result.ok) {
        finish();
        return;
      }

      const workbook = XLSX.utils.book_new();
      const rows = transformStatisticsForExcel(result.statisticsObject);
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const style_worksheet = setColumnsStyles(
        worksheet,
        result.statisticsObject,
      );

      style_worksheet["!cols"] = autoSizeColumns(rows);
      style_worksheet["!merges"] = setMerges();

      const file_name = "estadisticas_" + getDate();

      XLSX.utils.book_append_sheet(workbook, style_worksheet, "Estadísticas");

      XLSX.writeFile(workbook, file_name + ".xlsx");

      finish();
      stopInterval();
    } catch (error) {
      setAnnouncement({
        isActivated: true,
        isOk: false,
        message: "Ocurrió un error al exportar las estadísticas a Excel",
      });
      finish();
      stopInterval();
      console.log("Error: ", error);
    }
  };

  return (
    <BouncingButton
      action={handleDownloadStatistics}
      backgroundColorHover="#ffffff"
      backgroundColor="#22c55e"
      textColor="#ffffff"
      textColorHover="#22c55e"
      border="2px solid #ffffff"
      borderHover="2px solid #22c55e"
      twClassName="w-fit h-fit py-2 px-4 rounded-2xl"
      disabled={downloading}
    >
      {downloading ? (
        <>
          <Loader className="size-4 animate-spin" />
          <p>Descargar estadísticas</p>
        </>
      ) : (
        <>
          <Download className="size-4" />
          <p>Descargar estadísticas</p>
        </>
      )}
    </BouncingButton>
  );
}
