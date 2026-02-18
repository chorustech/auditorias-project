import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function NcrPage() {
  return <DinamicTableContent pointer="ncr" columns={data["ncr"]} />;
}
