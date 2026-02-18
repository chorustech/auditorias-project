import { SharedAddUpdateReportContent } from "@/content/reports/management/addReport/shared/SharedAddUpdateReportContent";

export default async function PizzaTrayUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <SharedAddUpdateReportContent
      pointer="pizza-tray"
      isUpdate
      id={id}
    />
  );
}
