import { SharedInsertUpdateReportContent } from "@/content/reports/management/addUpdateReport/general/GeneralInsertUpdateReportContent";

export default async function PizzaTrayUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SharedInsertUpdateReportContent isUpdate id={id} />;
}
