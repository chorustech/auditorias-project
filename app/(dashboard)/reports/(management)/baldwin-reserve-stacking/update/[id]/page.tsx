import { InsertUpdateGeneralReportContent } from "@/content/reports/components/insertUpdate/general/InsertUpdateGeneralReportContent";

export default async function BaldwinReserveStackingUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <InsertUpdateGeneralReportContent isUpdate id={id} />;
}
