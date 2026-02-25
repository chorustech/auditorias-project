import { EolaInsertUpdateReportContent } from "@/content/reports/management/addUpdateReport/unique/eola/EolaInsertUpdateReportContent";

export default async function EolaUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EolaInsertUpdateReportContent isUpdate id={id} />;
}
