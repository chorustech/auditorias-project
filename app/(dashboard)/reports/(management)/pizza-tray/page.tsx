import { DinamicTableContent } from "@/content/reports/management/DinamicTableContent";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";

export default function PizzaTrayPage() {
  return (
    <DinamicTableContent pointer="pizza-tray" columns={data["pizza-tray"]} />
  );
}
