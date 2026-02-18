import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function BaldwinReserveGeneralPage() {
  return (
    <DinamicTableContent
      pointer="baldwin-reserve-general"
      columns={data["baldwin-reserve-general"]}
    />
  );
}
