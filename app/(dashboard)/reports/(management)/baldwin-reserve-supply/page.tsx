import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function BaldwinReserveSupplyPage() {
  return (
    <DinamicTableContent
      pointer="baldwin-reserve-supply"
      columns={data["baldwin-reserve-supply"]}
    />
  );
}
