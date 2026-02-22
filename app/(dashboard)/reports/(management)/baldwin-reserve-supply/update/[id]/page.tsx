import { SharedAddUpdateReportContent } from "@/content/reports/management/addReport/shared/SharedAddUpdateReportContent";

export default async function BaldwinReserveSupplyUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SharedAddUpdateReportContent isUpdate id={id} />;
}
