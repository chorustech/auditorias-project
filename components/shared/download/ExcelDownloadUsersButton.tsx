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
import { selectUsers } from "@/temp/Users/Infrastructure/usersController";

/* STORES */
import { useDownloadStore } from "@/stores/download/downloadStore";
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { IQuery } from "@/temp/Shared/Domain/Interfaces/IQuery";
import { UserType } from "@/temp/Users/Infrastructure/Types/userData";

/* UTILS */
import { autoSizeColumns } from "@/components/shared/download/utils/shared/autoSizeColumns";
import { setColumnsStyles } from "@/components/shared/download/utils/users/setColumnsStyles";
import { getDate } from "@/utils/date";
import { transformUsersForExcel } from "@/components/shared/download/utils/users/transformUsersForExcel";

export function ExcelDownloadUsersButton({
  query,
}: {
  query: IQuery<UserType>;
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

  const handleDownloadUsers = async () => {
    try {
      if (downloading) return;

      start();
      setProgress(0);

      await new Promise((r) => setTimeout(r, 200));
      await animateProgressTo(99);

      const result = await selectUsers({ query });

      if (!result.ok) {
        finish();
        return;
      }

      const workbook = XLSX.utils.book_new();
      const rows = transformUsersForExcel(result.data);
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const style_worksheet = setColumnsStyles(worksheet, result.data);

      style_worksheet["!cols"] = autoSizeColumns(rows);

      const file_name = "usuarios_" + getDate();

      XLSX.utils.book_append_sheet(workbook, style_worksheet, "Usuarios");

      XLSX.writeFile(workbook, file_name + ".xlsx");

      finish();
      stopInterval();
    } catch (error) {
      setAnnouncement({
        isActivated: true,
        isOk: false,
        message: "Ocurrió un error al exportar los usuarios a Excel",
      });
      finish();
      stopInterval();
      console.log("Error: ", error);
    }
  };

  return (
    <BouncingButton
      action={handleDownloadUsers}
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
