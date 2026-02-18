import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function DisplayAreaPage() {
  return (
    <DinamicTableContent
      pointer="display-area"
      columns={data["display-area"]}
    />
  );
}
