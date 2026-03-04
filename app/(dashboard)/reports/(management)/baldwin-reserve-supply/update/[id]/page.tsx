import { InsertUpdateGeneralReportContent } from "@/content/reports/management/insertUpdateReport/general/InsertUpdateGeneralReportContent";

export default async function BaldwinReserveSupplyUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <InsertUpdateGeneralReportContent isUpdate id={id} />;
}
