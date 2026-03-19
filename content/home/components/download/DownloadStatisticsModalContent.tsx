"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicInputDate } from "@/components/shared/form/dinamicInput/DinamicInputDate";

/* HOOKS */
import { FormProvider, useForm } from "react-hook-form";
import { useRef } from "react";

/* ICONS */
import { Loader, Download } from "lucide-react";

/* LIBS */
import * as XLSX from "xlsx-js-style";

/* SERVER ACTION */
import { selectStatisticsObject } from "@/temp/Reports/Infrastructure/reportsController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useModal } from "@/stores/modal/modalStore";
import { useDownloadStore } from "@/stores/download/downloadStore";

/* TYPES */
import { DownloadStatisticsFormValues } from "@/content/home/types/DownloadStatisticsFormValues";

/* UTILS */
import { autoSizeColumns } from "@/components/shared/download/utils/shared/autoSizeColumns";
import { getDate } from "@/utils/date";
import { transformStatisticsForExcel } from "@/components/shared/download/utils/statistics/transformStatisticsForExcel";
import { setMerges } from "@/components/shared/download/utils/statistics/setMerges";
import { setColumnsStyles } from "@/components/shared/download/utils/statistics/setColumnsStyles";

export function DownloadStatisticsModalContent() {
  const { setAnnouncement } = useAnnouncement();
  const { modal, setModal } = useModal();
  const { downloading, start, finish, setProgress } = useDownloadStore();

  const methods = useForm<DownloadStatisticsFormValues>({
    defaultValues: {
      date: undefined,
    },
  });

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

  const onSubmit = async (data: DownloadStatisticsFormValues) => {
    try {
      if (downloading) return;

      console.log(data);

      start();
      setProgress(0);

      await new Promise((r) => setTimeout(r, 200));
      await animateProgressTo(99);

      const month: number = data.date?.getMonth() ?? 0;

      const result = await selectStatisticsObject({ month });

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

      setModal({
        isActivated: false,
        title: modal.title ?? "",
        body: modal.body,
      });

      methods.reset()
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
    <FormProvider {...methods}>
      <div className="w-full overflow-y-auto max-h-60">
        {/* FECHA */}
        <DinamicInputDate<DownloadStatisticsFormValues>
          name="date"
          label="Fecha"
          placeholder="Seleccione una fecha"
          rules={{
            required: "La fecha es necesaria",
          }}
          mode="single"
        />
      </div>

      <div className="flex gap-4">
        {/* BOTÓN CANCELAR */}
        <BouncingButton
          action={
            downloading
              ? () => {}
              : () => {
                  setModal({
                    isActivated: false,
                    title: modal.title ?? "",
                    body: modal.body,
                  });
                }
          }
          backgroundColorHover="#00A0D0"
          backgroundColor="#ffffff"
          textColor="#00A0D0"
          textColorHover="#ffffff"
          border="2px solid #00A0D0"
          borderHover="2px solid #00A0D0"
          twClassName="w-full h-fit px-4 py-2 rounded-2xl"
          disabled={downloading ? true : false}
        >
          <span>Cancelar</span>
        </BouncingButton>

        {/* BOTÓN DESCARGAR */}
        <BouncingButton
          action={() => {
            if (downloading) return;
            methods.handleSubmit(onSubmit)();
          }}
          backgroundColorHover="#22c55e"
          backgroundColor="#22c55e"
          textColor="#ffffff"
          textColorHover="#ffffff"
          border="2px solid #22c55e"
          borderHover="2px solid #22c55e"
          twClassName="w-full h-fit px-4 py-2 rounded-2xl"
          disabled={downloading ? true : false}
        >
          {downloading ? (
            <>
              <span className="text-transparent">E</span>
              <Loader className="size-4 animate-spin" />
              <span className="text-transparent">E</span>
            </>
          ) : (
            <>
              <Download className="size-4" />
              <span>Descargar</span>
            </>
          )}
        </BouncingButton>
      </div>
    </FormProvider>
  );
}
