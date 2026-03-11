"use client";

import * as XLSX from "xlsx";
import { useDownloadStore } from "@/stores/download/downloadStore";
import { IQuery } from "@/temp/Shared/Domain/Interfaces/IQuery";

type ExcelServerAction<T> = (params: { query: IQuery<T> }) => Promise<{
  data: T[];
  count: number;
  ok: boolean;
  message: string;
}>;

interface Props<T> {
  action: ExcelServerAction<T>;
  query: IQuery<T>;
  filename: string;
}

export default function ExcelDownloadButton<T>({
  action,
  query,
  filename,
}: Props<T>) {
  const { downloading, start, finish, setProgress } = useDownloadStore();

  const handleDownload = async () => {
    if (downloading) return;

    start();

    setProgress(10);

    const result = await action({ query });

    setProgress(40);

    const worksheet = XLSX.utils.json_to_sheet(result.data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    setProgress(80);

    XLSX.writeFile(workbook, `${filename}.xlsx`);

    setProgress(100);

    finish();
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-40"
    >
      {downloading ? "Generando..." : "Descargar Excel"}
    </button>
  );
}
