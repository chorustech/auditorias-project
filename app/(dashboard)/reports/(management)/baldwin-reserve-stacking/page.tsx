import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function BaldwinReserveStackingPage() {
  return (
    <DinamicTableContent
      pointer="baldwin-reserve-stacking"
      columns={data["baldwin-reserve-stacking"]}
    />
  );
}
