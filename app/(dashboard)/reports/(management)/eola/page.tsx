import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function EolaPage() {
  return <DinamicTableContent pointer="eola" columns={data["eola"]} />;
}
