import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function BaldwinStatePage() {
  return (
    <DinamicTableContent
      pointer="baldwin-state"
      columns={data["baldwin-reserve-supply"]}
    />
  );
}
