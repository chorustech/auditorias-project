import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function RacPage() {
  return <DinamicTableContent pointer="rac" columns={data["rac"]} />;
}
