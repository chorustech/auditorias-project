import { EolaAddUpdateReportContent } from "@/content/reports/management/addReport/unique/eola/EolaAddUpdateReportContent";

export default async function EolaUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EolaAddUpdateReportContent isUpdate id={id} />;
}
