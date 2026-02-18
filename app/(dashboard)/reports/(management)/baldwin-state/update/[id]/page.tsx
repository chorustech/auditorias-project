import { SharedAddUpdateReportContent } from "@/content/reports/management/addReport/shared/SharedAddUpdateReportContent";

export default async function BaldwinReserveGeneralUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <SharedAddUpdateReportContent
      pointer="baldwin-state"
      isUpdate
      id={id}
    />
  );
}
