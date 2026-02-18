import { SharedAddUpdateReportContent } from "@/content/reports/management/addReport/shared/SharedAddUpdateReportContent";

export default async function DisplayAreaUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <SharedAddUpdateReportContent
      pointer="display-area"
      isUpdate
      id={id}
    />
  );
}
