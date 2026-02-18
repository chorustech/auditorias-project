import { SharedAddUpdateReportContent } from "@/content/reports/management/addReport/shared/SharedAddUpdateReportContent";

export default async function BaldwinReserveStackingUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <SharedAddUpdateReportContent
      pointer="baldwin-reserve-stacking"
      isUpdate
      id={id}
    />
  );
}
