"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* ICONS */
import { Download, Loader } from "lucide-react";

/* LIBS */
import * as XLSX from "xlsx-js-style";

/* SERVER ACTION */
import { selectReports } from "@/temp/Reports/Infrastructure/reportsController";

/* STORES */
import { useDownloadStore } from "@/stores/download/downloadStore";
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { IQuery } from "@/temp/Shared/Domain/Interfaces/IQuery";
import {
  EolaReport,
  GeneralReport,
  NcrReport,
  RacReport,
} from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";

/* UTILS */
import { PointerArea } from "@/utils/pointerArea";
import { autoSizeColumns } from "@/components/shared/download/utils/autoSizeColumns";
import { transformReportsForExcel } from "@/components/shared/download/utils/transformReportsForExcel";
import { setMerges } from "@/components/shared/download/utils/setMerges";
import { setColumnsStyles } from "@/components/shared/download/utils/setColumnsStyles";
import { getDate } from "@/utils/date";

export default function DownloadReportsExcelButton({
  pointer,
  query,
}: {
  pointer: PointerArea;
  query: IQuery<GeneralReport & EolaReport & NcrReport & RacReport>;
}) {
  const { setAnnouncement } = useAnnouncement();
  const { downloading, start, finish, setProgress } = useDownloadStore();

  const handleDownload = async () => {
    try {
      if (downloading) return;

      start();

      const result = await selectReports({ pointer, query });

      if (!result.ok) {
        finish();
        return;
      }

      setProgress(40);

      const workbook = XLSX.utils.book_new();
      const rows = transformReportsForExcel(result.data);
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const style_worksheet = setColumnsStyles(pointer, worksheet, result.data);

      style_worksheet["!cols"] = autoSizeColumns(rows);
      style_worksheet["!merges"] = setMerges(pointer);

      const file_name = pointer + "_" + getDate();

      XLSX.utils.book_append_sheet(workbook, style_worksheet, "Reportes");

      setProgress(80);

      XLSX.writeFile(workbook, file_name + ".xlsx");

      setProgress(100);

      finish();
    } catch (error) {
      setAnnouncement({
        isActivated: true,
        isOk: false,
        message: "Ocurrió un error al exportar los reportes a Excel",
      });
      finish();
      console.log("Error: ", error);
    }
  };

  return (
    <BouncingButton
      action={handleDownload}
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
