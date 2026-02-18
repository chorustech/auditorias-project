import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function BaldwinReservePackingPage() {
  return (
    <DinamicTableContent
      pointer="baldwin-reserve-packing"
      columns={data["baldwin-reserve-packing"]}
    />
  );
}
